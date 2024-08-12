const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include:[{model: User}]
    });

    const posts = postData.map((post) => post.get({ plain: true }));


    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to render the new post page
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {
      logged_in: req.session.logged_in
  });
});

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      include:[{model: User},{model: Comment, include:[{model: User}]}]
    });

    const posts = postData.get({ plain: true });


    res.render('single-post', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to add a comment to a post
router.post('/post/:id/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Route to render the new post page
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {
      logged_in: req.session.logged_in
  });
});

// Route to delete a comment
router.delete('/comment/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, //match comment to user id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id for the user' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/register', (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/');
      return;
  }

  res.render('register');
});
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});


module.exports = router;
