import * as postModel from '../models/posts.js';

async function getAllPosts(req, res, next) {
    try {
        const { id } = req.query;

        const posts = await postModel.getAllPosts({ id });

        res.json({
            status: 'ok',
            posts
        });
    } catch (err) {
        next(err);
    }
}

async function getPost(req, res, next) {
    try {
        const post = await postModel.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'Post not found'
            });
        }

        res.json({
            status: 'ok',
            post
        });
    } catch (err) {
        next(err);
    }
}

async function createPost(req, res, next) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                status: 'error',
                message: 'Missing fields'
            });
        }

        const userId = req.user.id;

        const post = await postModel.createPost({
            title,
            content,
            userId
        });

        res.status(201).json({
            status: 'ok',
            post
        });
    } catch (err) {
        next(err);
    }
}

async function updatePost(req, res, next) {
    try {
        const post = await postModel.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'Post not found'
            });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden'
            });
        }

        const updated = await postModel.updatePost(req.params.id, req.body);

        res.json({
            status: 'ok',
            post: updated
        });
    } catch (err) {
        next(err);
    }
}

async function deletePost(req, res, next) {
    try {
        const post = await postModel.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                status: 'error',
                message: 'Post not found'
            });
        }

        if (post.userId !== req.user.id) {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden'
            });
        }

        await postModel.deletePost(req.params.id);

        res.json({
            status: 'ok'
        });
    } catch (err) {
        next(err);
    }
}

export default {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};