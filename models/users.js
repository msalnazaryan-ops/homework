import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

const filePath = path.resolve('data/users.json');


export async function initializeDataFile() {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
    }
}


async function readUsers() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data || '[]');
}


async function writeUsers(users) {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}


export async function createUser({ username, email, password }) {
    const users = await readUsers();

    // check duplicate email
    const exists = users.find(u => u.email === email);
    if (exists) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: uuidv4(),
        username,
        email,
        password: hashPassword(password),
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    
    return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    };
}


export async function loginUser(email, password) {
    const users = await readUsers();

    const user = users.find(u => u.email === email);

    if (!user) return null;

    const valid = verifyPassword(password, user.password);

    if (!valid) return null;

    return {
        id: user.id,
        username: user.username,
        email: user.email
    };
}


function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}


function verifyPassword(password, hash) {
    return hashPassword(password) === hash;
}