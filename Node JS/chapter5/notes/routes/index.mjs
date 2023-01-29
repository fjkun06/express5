import { default as express } from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('index', { title: 'Notes' });
});

export default router;
