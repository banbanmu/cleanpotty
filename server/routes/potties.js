import express from 'express';
import {User,Poop,Potty} from '../models';

const router = express.Router();

router.get('/story/:id', (req,res) =>{
    let id = req.params.id;
    Poop.find({ user: id }, (err, poops) => {
        if (err) throw err;
        return res.json({ 
            code: "success", 
            data: poops,
        });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
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
            return res.json({ 
                code: "success", 
                data: potties,
            });
        });
    });
});

export default router;