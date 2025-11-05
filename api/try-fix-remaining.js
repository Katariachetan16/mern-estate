import mongoose from 'mongoose';
import { config } from 'dotenv';
import Listing from './models/listing.model.js';
import https from 'https';
import http from 'http';
import { URL } from 'url';

config();

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

const candidates = [
  'https://images.unsplash.com/photo-1505691723518-36a0c5c9b12f?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1475855581690-80accde3ae2c?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80'
];

const targets = [
  { regex: /Classic Spanish Hacienda/i, index: 1 },
  { regex: /Sleek Scandinavian Home/i, index: 1 }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');

    for (const t of targets) {
      const listing = await Listing.findOne({ name: { $regex: t.regex } });
      if (!listing) { console.warn('Not found:', t.regex); continue; }
      console.log('Trying fixes for', listing.name, 'index', t.index);

      let replaced = false;
      for (const c of candidates) {
        const result = await checkUrl(c);
        if (result.ok) {
          listing.imageUrls[t.index] = c;
          await listing.save();
          console.log('Replaced with working image:', c);
          replaced = true;
          break;
        } else {
          console.log('Candidate failed:', c, 'status', result.status || 'error');
        }
      }
      if (!replaced) console.warn('No working candidate found for', listing.name);
    }

    // Final verification
    const listings = await Listing.find({});
    const failures = [];
    for (const l of listings) {
      for (let i = 0; i < l.imageUrls.length; i++) {
        const r = await checkUrl(l.imageUrls[i]);
        if (!r.ok) failures.push({ name: l.name, index: i, url: l.imageUrls[i], status: r.status || 'error' });
      }
    }

    if (failures.length === 0) console.log('\nAll images verified OK.');
    else {
      console.log('\nRemaining failures:');
      for (const f of failures) console.log(`- ${f.name} index ${f.index} status ${f.status} url ${f.url}`);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected');
  }
}

run();