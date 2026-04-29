import express from 'express';
import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// routes
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Server is working 🚀' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});