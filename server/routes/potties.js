import express from 'express';
import {User,Poop,Potty} from '../models';

const router = express.Router();

router.get('/potties/:id', (req, res) => {
    const id = parseInt(req.params.id,10);
    if(!id) {
        return res.status(400).json({error:'Incorrect id'});
    } //user id
    Poop.find({ user: id }, (err, poops) => {
        let pottiesSet = new Set();
        for(let poop of poops){
            pottiesSet.add(poop.potty)
        }
        let pottiesArr = Array.from(pottiesSet)
        Potty.find({'_id':{$in:pottiesArr}},(err,potties)=>{
            return res.json({ data: potties });
            }
        )
    });
});

export default router;