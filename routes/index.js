//what you are requiring in
const router = require('express').Router();
const apiRoutes = require('./api');

//use the /api route
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;