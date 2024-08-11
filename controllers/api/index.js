const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes')

router.use('/users', userRoutes);
router.use('/post', postRoutes);
// router.use('/users', userRoutes); for comments


module.exports = router;
