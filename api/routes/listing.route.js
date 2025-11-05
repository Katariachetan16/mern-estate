import express from 'express';
import multer from 'multer';
import path from 'path';
import { createListing, deleteListing, updateListing, getListing, getListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Use BACKEND_URL from environment when behind a proxy (Vite dev server),
// otherwise default to localhost:3003. This ensures uploaded file URLs point
// to the backend host instead of the dev server host.
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3003';

const _dirname = path.resolve();
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(_dirname, 'uploads'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const ext = path.extname(file.originalname);
		cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
	}
});

const fileFilter = (req, file, cb) => {
	const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	if (allowed.includes(file.mimetype)) cb(null, true);
	else cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'), false);
};

// 6 MB limit for listing images
const upload = multer({ storage, limits: { fileSize: 6 * 1024 * 1024 }, fileFilter });

router.post('/upload', verifyToken, (req, res) => {
	const uploadSingle = upload.single('image');
	uploadSingle(req, res, function (err) {
		if (err) {
			if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ success: false, message: 'File too large. Max size is 6 MB.' });
			return res.status(400).json({ success: false, message: err.message || 'Upload error' });
		}
		if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
			// Debug: log the saved filename
			console.log('Listing upload saved file:', req.file.filename, 'mimetype:', req.file.mimetype);
			// construct absolute URL using configured backend base URL so the frontend can load the image
			const fileUrl = `${BASE_URL}/uploads/${req.file.filename}`;
			res.status(200).json({ success: true, url: fileUrl });
	});
});

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
