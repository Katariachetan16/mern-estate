import mongoose from 'mongoose';
import { config } from 'dotenv';
import Listing from './models/listing.model.js';
import https from 'https';
import http from 'http';
import { URL } from 'url';

config();

const fallbackPool = [
  'https://images.unsplash.com/photo-1505691723518-36a0c5c9b12f?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1475855581690-80accde3ae2c?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80'
];

function checkUrl(url, timeout = 8000) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const lib = parsed.protocol === 'https:' ? https : http;
      const options = { method: 'HEAD', timeout };
      const req = lib.request(parsed, options, (res) => {
        const status = res.statusCode;
        const contentType = (res.headers['content-type'] || '').toLowerCase();
        const ok = status >= 200 && status < 300 && contentType.includes('image');
        res.resume();
        resolve({ ok, status, contentType });
      });
      req.on('error', () => {
        const getReq = lib.get(parsed, (res) => {
          const status = res.statusCode;
          const contentType = (res.headers['content-type'] || '').toLowerCase();
          const ok = status >= 200 && status < 300 && contentType.includes('image');
          res.resume();
          resolve({ ok, status, contentType });
        });
        getReq.on('error', () => resolve({ ok: false }));
        getReq.setTimeout(timeout, () => { getReq.abort(); resolve({ ok: false }); });
      });
      req.setTimeout(timeout, () => { req.abort(); resolve({ ok: false }); });
      req.end();
    } catch (e) {
      resolve({ ok: false });
    }
  });
}

function pickFallback(existingUrls, usedFallbacks) {
  for (const url of fallbackPool) {
    if (!existingUrls.includes(url) && !usedFallbacks.has(url)) {
      usedFallbacks.add(url);
      return url;
    }
  }
  return fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO, { maxPoolSize: 10 });
    console.log('Connected to MongoDB');

    const listings = await Listing.find({});
    console.log(`Scanning ${listings.length} listings for broken images...`);

    const report = [];
    for (const listing of listings) {
      const { name, imageUrls } = listing;
      if (!Array.isArray(imageUrls) || imageUrls.length === 0) continue;

      const broken = [];
      const usedFallbacks = new Set();
      const existing = imageUrls.slice();
      let changed = false;

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const result = await checkUrl(url);
        if (!result.ok) {
          const fallback = pickFallback(existing, usedFallbacks);
          listing.imageUrls[i] = fallback;
          existing[i] = fallback;
          broken.push({ index: i, old: url, new: fallback, status: result.status || 'error' });
          changed = true;
        }
      }

      if (changed) {
        await listing.save();
        report.push({ name, broken });
        console.log(`Fixed ${broken.length} images for: ${name}`);
      }
    }

    // Verification pass
    const verifyReport = [];
    for (const listing of await Listing.find({})) {
      const bad = [];
      for (let i = 0; i < listing.imageUrls.length; i++) {
        const r = await checkUrl(listing.imageUrls[i]);
        if (!r.ok) bad.push({ index: i, url: listing.imageUrls[i] });
      }
      if (bad.length) verifyReport.push({ name: listing.name, bad });
    }

    console.log('\nScan complete. Summary:');
    console.log(`Listings scanned: ${listings.length}`);
    console.log(`Listings fixed: ${report.length}`);
    if (report.length) {
      for (const r of report) {
        console.log(`- ${r.name}: fixed ${r.broken.length} images (indexes: ${r.broken.map(b => b.index).join(',')})`);
      }
    }

    if (verifyReport.length === 0) {
      console.log('\nVerification: no broken images found. All images reachable.');
    } else {
      console.log('\nVerification: some images still broken:');
      for (const v of verifyReport) console.log(`- ${v.name}: indexes ${v.bad.map(b => b.index).join(',')}`);
    }

    // Write short JSON summary file
    const fs = await import('fs');
    const summary = { scanned: listings.length, fixed: report.length, fixes: report, verificationFailures: verifyReport };
    fs.writeFileSync('./image-fix-summary.json', JSON.stringify(summary, null, 2));
    console.log('\nWrote summary to image-fix-summary.json');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

run();