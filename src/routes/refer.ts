import express, { Router, Request, Response } from 'express';
import { Links, Users } from '../lib/db';

const router: Router = express.Router();
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function genRandomCode(length: number){
    let code = "";
    for(let i = 0; i < length; i++){
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;

}

router.get('/', async (req: Request, res: Response) => {
    let code: any = req.query.code;
    if (Number.isNaN(code)) {
        return res.status(400).json({ error: "Parameter code is not an integer" });
    }
    let link: Links | null = await Links.findOne({
        where: {
            code: code
        }
    });
    if (link === null) {
        return res.status(404).json({ error: "Invalid refer code!" });
    }
    await link.increment('views');
    res.redirect(link.redirectUrl);
});

router.post('/create', async (req: Request, res: Response) => {
    let username = req.body.username;
    if (username === undefined) {
        return res.status(400).json({ error: "Parameter username is required" });
    }
    let redirectUrl: string = req.body.redirect_url;
    if (redirectUrl === undefined) {
        return res.status(400).json({ error: "Parameter redirect_url is required" });
    }
    if (!redirectUrl.startsWith("http://") && !redirectUrl.startsWith("https://")) {
        return res.status(400).json({ error: "Parameter redirect_url must be a valid URL" });
    }

    let user: Users | null = await Users.findOne({
        where: {
            username: username
        }
    });
    if (user === null) {
        return res.status(404).json({ error: "User not found!" });
    }

    let code = genRandomCode(8);
    await Links.create({
        code: code,
        redirectUrl: redirectUrl,
        views: 0,
        createdBy: username
    });
    res.status(201).json({ 
        status: 'Successfully created new refer code', 
        code: code 
    });
});

router.get('/stats', async (req: Request, res: Response) => {
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