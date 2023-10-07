import express from 'express'
const router = express.Router();
import GiftsController from '../controllers/gifts.js'



//get all the gifts
router.get('/', GiftsController.getGifts)

//get a single gift
router.get('/:giftId', GiftsController.getGiftById)

// create a gift
router.post('/', GiftsController.createGift)

//update a gift
router.put('/:giftId', GiftsController.updateGift)

//delete a gift
router.delete('/:giftId', GiftsController.deleteGift)   


export default router
