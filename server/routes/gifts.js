import express from 'express'
import GiftsController from '../controllers/gifts.js'

const router = express.Router()

router.get('/', GiftsController.getGifts)
router.get('/:giftId', GiftsController.getGiftById)
router.get('/', GiftsController.createGift)
router.delete('/:id', GiftsController.deleteGift)
router.patch('/:id', GiftsController.updateGift)

export default router