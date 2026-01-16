const express = require('express');
const router = express.Router();
const BlogComment = require('../../models/BlogComment');
const Blog = require('../../models/Blog');

router.get('/:blogSlug/comments', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.blogSlug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const comments = await BlogComment.find({ blog: blog._id, isApproved: true, parentComment: null })
      .sort({ createdAt: -1 });

    const replies = await BlogComment.find({ blog: blog._id, isApproved: true, parentComment: { $ne: null } })
      .sort({ createdAt: 1 });

    res.json({ success: true, data: { comments, replies } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:blogSlug/comments', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.blogSlug });
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    const comment = await BlogComment.create({
      ...req.body,
      blog: blog._id
    });

    res.status(201).json({ success: true, data: comment, message: 'Comment submitted for approval' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:id/reply', async (req, res) => {
  try {
    const parentComment = await BlogComment.findById(req.params.id);
    if (!parentComment) {
      return res.status(404).json({ success: false, message: 'Comment not found' });
    }

    const reply = await BlogComment.create({
      ...req.body,
      blog: parentComment.blog,
      parentComment: parentComment._id
    });

    res.status(201).json({ success: true, data: reply, message: 'Reply submitted for approval' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
