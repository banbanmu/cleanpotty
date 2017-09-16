import express from 'express';
import {User,Poop,Potty} from '../models';

const router = express.Router();

router.get('/story/week', (req,res) =>{
    let id = req.session.userInfo._id;
    let date = new Date();
    let today = new Date(date.getDate());
    date.setDate(date.getDate() - 34);
    Poop.find({ user: id, time: { $gte : date } })
        .sort('-time').exec((err, poops) => {
        if (err) throw err;
        let first = true; let month = new Array();
        let week = new Array();
        date.setDate(today.getDate() - 6);
        let a = 0; let cnt = 0;
        for (p in poops) {
            if (p.time >= date){
                cnt++;
                a += p.timeSpent;
            } else {
                month.push({date: formatDate(date), value: a / cnt});
                date.setDate(date.getDate() - 7);
                a = p.timeSpent; cnt = 1;
            }
        }
        month.push({date: formatDate(date), value: a / cnt});
        let weekAgo = new Date(today.getDate() - 6);
        date.setDate(today.getDate());
        for (p in poops) {
            if (p.time < weekAgo) 
                break;
            if (p.time >= date) {
                a += p.timeSpent;
            } else {
                week.push({date: formatDate(date), value: a});
                date.setDate(date.getDate() - 1); a = p.timeSpent;
            }
        };
        return res.json({
            code: "success",
            data: { week, month }
        });
    });
});


router.get('/', (req, res) => {
    const id = req.session.userInfo._id;
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

router.post('/', (req, res) => {
    let { lat, lng } = req.body;
    let potty = new Potty({ lng, lat });
    potty.save(err => {
        if (err) throw err;
        return res.json({success: true});
    });
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export default router;