import express from 'express';
import { User } from '../models';

const router = express.Router();

router.post('/signup', (req, res) => {
    let { email, name, hash, password } = req.body;
    let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
    User.findOne({ email }, (err, exist) => {
        if (err) throw err;
        if (exist) {
            return res.status(400).json({
                error: "ALREADY_EXIST",
                code: 0
            });
        };
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "INVALID_EMAIL",
                code: 1
            });
        };  
        let user = new User({ email, name, hash });
        user.password = user.generateHash(password);
        user.save((err) => {
            if (err) throw err;
            return res.json({ success: true });
        });
    });
});

router.post('/signin', (req, res) => {
    let { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(400).json({
                error: "LOGIN_FAILED",
                code: 0
            });
        };
        if (!user.validateHash(password)) {
            return res.status(400).json({
                error: "LOGIN_FAILED",
                code: 0
            });
        };
        req.session.userInfo = {
            _id: user._id,
            email: user.email
        };
        return res.json({ success: true });
    });
});

export default router;