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

async function run() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');

    // New verified images
    const replacements = [
      {
        findNameRegex: /Classic Spanish Hacienda/i,
        index: 1,
        newUrl: 'https://images.unsplash.com/photo-1611403119862-5f46a83a8a4c?w=800&auto=format&fit=crop&q=80'
      },
      {
        findNameRegex: /Sleek Scandinavian Home/i,
        index: 1,
        newUrl: 'https://images.unsplash.com/photo-1594023237206-e3824a5a480a?w=800&auto=format&fit=crop&q=80'
      }
    ];

    for (const rep of replacements) {
      const listing = await Listing.findOne({ name: { $regex: rep.findNameRegex } });
      if (!listing) {
        console.warn('Listing not found for', rep.findNameRegex);
        continue;
      }
      console.log('Before update, checking URL at index', rep.index, 'for', listing.name);
      const before = listing.imageUrls[rep.index];
      const respBefore = await checkUrl(before);
      console.log('Before status:', respBefore.ok ? `OK(${respBefore.status})` : `BAD(${respBefore.status || 'error'})`);

      listing.imageUrls[rep.index] = rep.newUrl;
      await listing.save();
      console.log('Replaced image for', listing.name, 'index', rep.index);

      const after = await checkUrl(rep.newUrl);
      console.log('After status:', after.ok ? `OK(${after.status})` : `BAD(${after.status || 'error'})`);
    }

    // Full verification pass
    const listings = await Listing.find({});
    const failures = [];
    for (const l of listings) {
      for (let i = 0; i < l.imageUrls.length; i++) {
        const r = await checkUrl(l.imageUrls[i]);
        if (!r.ok) failures.push({ name: l.name, index: i, url: l.imageUrls[i], status: r.status || 'error' });
      }
    }

    if (failures.length === 0) {
      console.log('\nVerification passed: no broken images found.');
    } else {
      console.log('\nVerification found broken images:');
      for (const f of failures) console.log(`- ${f.name} index ${f.index} status ${f.status} url ${f.url}`);
    }

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  }
}

run();