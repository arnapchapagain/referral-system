import express, { Router, Request, Response } from 'express';
import { Links } from '../lib/db';

const router: Router = express.Router();

router.get('/views', async (req: Request, res: Response) => {
    let code = req.query.code;
    if (code === undefined) {
        return res.status(400).json({ error: "Parameter code is required" });
    }
    let link = await Links.findOne({
        where: {
            code: code
        }
    });
    if (link === null) {
        return res.status(404).json({ error: "Invalid referral code" });
    }
    res.status(200).json({ 
        views: link.views,
        redirect_url: link.redirectUrl 
    });
});

export { router };