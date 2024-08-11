const router = require('express').Router();
const { User, Post } = require('../models');
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

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id,{
      include:[{model: User}]
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
// Route to render the new post page
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {
      logged_in: req.session.logged_in
  });
});



// router.get('/newpost', withAuth, async (req, res) => {
//   try {
// res.render('newpost', {
//   loggedIn: req.session.loggedIn
// })
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

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
