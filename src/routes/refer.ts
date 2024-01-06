import express, { Router, Request, Response } from 'express';
import { Links } from '../lib/db';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    let code: any = req.query.code;
    if (Number.isNaN(code)) {
        return res.status(400).json({ error: "Parameter code is not an integer" });
    }
    let link: Links | null = await Links.findOne({
        where: {
            createdBy: code
        }
    });
    if (link === null) {
        return res.status(404).json({ error: "Invalid refer code!" });
    }
    await link.increment('views');
    res.redirect(link.redirectUrl);
});

export { router };