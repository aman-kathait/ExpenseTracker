const express = require('express');
const {protect}=require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { 
    registerUser,
    loginUser,
    getUserInfo
} = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getUser', protect, getUserInfo);

router.post('/upload-image',upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        imageUrl: `/uploads/${req.file.filename}`
    });
});

module.exports = router;