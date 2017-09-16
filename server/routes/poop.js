import express from 'express';
import { User, Poop, Potty } from '../models';

const router = express.Router();

router.post('/', (req, res) => {
    let { hash, timeSpent, type, potty_id } = req.body;
    User.findOne({ hash }, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(400).json({
                //error: "USER_NOT_EXIST",
                code: "0",
                data: null
            });
        };
        Potty.findById(potty_id, (err, potty) => {
            if (err) throw err;
            if (!potty) {
                return res.status(400).json({
                    //error: "POTTY_NOT_EXIST",
                    code: "1",
                    data: null
                });
            };
            let poop = new Poop({ timeSpent, type });
            poop.potty = potty._id;
            poop.user = user._id;
            poop.save(err => {
                if (err) throw err;
                return res.json({ 
                    code: "success",
                    data: null,
                });
            });
        });
    });
});

export default router;