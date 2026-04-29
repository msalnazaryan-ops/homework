import fs from 'fs/promises';
import path from 'path';
import { v7 as uuidv7 } from 'uuid';

const filePath = path.resolve('data/posts.json');

export async function initializePostsFile() {
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
    }
}

async function readPosts() {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

async function writePosts(posts) {
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
}

export async function getAllPosts(filters = {}) {
    const posts = await readPosts();

    if (filters.id) {
        return posts.filter(p => p.id === filters.id);
    }

    return posts;
}

export async function getPostById(postId) {
    const posts = await readPosts();
    return posts.find(p => p.id === postId);
}

export async function getPostsByUserId(userId) {
    const posts = await readPosts();
    return posts.filter(p => p.userId === userId);
}

export async function createPost({ title, content, userId }) {
    const posts = await readPosts();

    const newPost = {
        id: uuidv7(),
        title,
        content,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    posts.push(newPost);
    await writePosts(posts);

    return newPost;
}

export async function updatePost(postId, updates) {
    const posts = await readPosts();

    const index = posts.findIndex(p => p.id === postId);
    if (index === -1) return null;

    posts[index] = {
        ...posts[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    await writePosts(posts);
    return posts[index];
}

export async function deletePost(postId) {
    const posts = await readPosts();

    const filtered = posts.filter(p => p.id !== postId);

    await writePosts(filtered);
}