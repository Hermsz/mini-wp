const router = require('express').Router()
const articleController = require('../controllers/articlesController')
const { authentication } = require('../middlewares/authentication')
const { userauthorization } = require('../middlewares/authorization')
const gcsMiddlewares = require('../middlewares/gCLoudStorage')
const Multer = require('multer')
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.get('/', articleController.findAllArticle)
router.use(authentication)
router.get('/myarticle', articleController.findArticleUser)
router.get('/:id', articleController.findOneArticle)

router.post('/', multer.single('image'), gcsMiddlewares.sendUploadToGCS, articleController.createArticle)

router.delete('/:id', userauthorization, articleController.deleteArticle)
router.put('/:id',multer.single('image'), gcsMiddlewares.sendUploadToGCS, userauthorization, articleController.updateArticle)


module.exports = router