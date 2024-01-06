import express, { Router, Request, Response } from 'express';
import { Users } from '../lib/db';
import bcrypt from 'bcrypt';

const router: Router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username === undefined) {
        return res.status(400).json({ error: "Parameter username is required" });
    }
    if (password === undefined) {
        return res.status(400).json({ error: "Parameter password is required" });
    }
    let user: Users | null = await Users.findOne({
        where: {
            username: username
        }
    });
    if (user !== null) {
        return res.status(409).json({ error: "User already exists!" });
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    await Users.create({
        username: username,
        password: hash
    });
    res.status(201).json({ message: "User created successfully!" });
});

router.post('/login', async (req: Request, res: Response) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username === undefined) {
        return res.status(400).json({ error: "Parameter username is required" });
    }
    if (password === undefined) {
        return res.status(400).json({ error: "Parameter password is required" });
    }

    let user: Users | null = await Users.findOne({
        where: {
            username: username
        }
    });

    if (user === null) {
        return res.status(404).json({ error: "User not found!" });
    }

    let match = await bcrypt.compare(password, user.password);
    if (match) {
        return res.status(200).json({ message: "Login successful!" });
    } else {
        return res.status(401).json({ error: "Incorrect password!" });
    }
})

export { router };