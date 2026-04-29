import * as userModel from '../models/users.js';


export async function registration(req, res, next) {
    try {
        const user = await userModel.createUser(req.body);

        res.json({
            status: 'ok',
            user
        });

    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}


export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await userModel.loginUser(email, password);

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        res.json({
            status: 'ok',
            user
        });

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
}