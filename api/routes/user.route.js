import express from 'express';
import multer from 'multer';
import path from 'path';
import { deleteUser, test, updateUser,  getUserListings, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

// Use BACKEND_URL from environment when behind a proxy (Vite dev server),
// otherwise default to localhost:3003. This ensures uploaded file URLs point
// to the backend host instead of the dev server host.
const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3003';

// configure multer storage
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
// Accept only common image mime types and limit file size to 5 MB
const fileFilter = (req, file, cb) => {
	const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
	if (allowed.includes(file.mimetype)) cb(null, true);
	else cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'), false);
};

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

router.get('/test', test);
router.post('/upload', verifyToken, (req, res) => {
	// Use the upload middleware and handle Multer errors
	const uploadSingle = upload.single('image');
	uploadSingle(req, res, function (err) {
		if (err) {
			// Multer error with code
			if (err.code === 'LIMIT_FILE_SIZE') {
				return res.status(400).json({ success: false, message: 'File too large. Max size is 5 MB.' });
			}
			return res.status(400).json({ success: false, message: err.message || 'Upload error' });
		}
		if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
		// Return the absolute URL for the uploaded file so client can load it across origins
		const fileUrl = `${BASE_URL}/uploads/${req.file.filename}`;
		res.status(200).json({ success: true, url: fileUrl });
	});
});
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

export default router;