import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    let code = req.query.code;
    // check for code in a database
    // get the redirect url
});

export { router };