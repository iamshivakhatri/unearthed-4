import { pool } from '../config/database.js'

const getGifts = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM gifts ORDER BY id ASC')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

const getGiftById = async (req, res) => {
  try {
    const giftId = req.params.giftId
    const selectQuery = `SELECT name, pricePoint, audience, image, description, submittedBy, submittedOn FROM gifts WHERE id = ${giftId}`
    const results = await pool.query(selectQuery)

    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

//creating the gift
const createGift = async (req, res) => {
 try {
    const { name, pricePoint, audience, image, description, submittedBy, submittedOn } = req.body
    console.log("This is the req body", req.body)
    const insertQuery = `INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    VALUES = [name, pricePoint, audience, image, description, submittedBy, submittedOn]

    const results = await pool.query(insertQuery, VALUES)
    res.status(201).json(results.rows[0])
  
 } catch (error) {
  
 }
}


// Update the gift

const updateGift = async (req, res) => {
  try {
    const giftId = req.params.giftId
    const { name, pricePoint, audience, image, description, submittedBy, submittedOn } = req.body
    const updateQuery = `UPDATE gifts SET name = $1, pricePoint = $2, audience = $3, image = $4, description = $5, submittedBy = $6, submittedOn = $7 WHERE id = $8 RETURNING *`
    const VALUES = [name, pricePoint, audience, image, description, submittedBy, submittedOn, giftId]
    const results = await pool.query(updateQuery, VALUES)
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

//delete the gift
const deleteGift = async (req, res) => {
  try{
    const giftId = req.params.giftId
    const deleteQuery = `DELETE FROM gifts WHERE id = $1`
    const VALUES = [giftId]
    const results = await pool.query(deleteQuery, VALUES)
    res.status(200).json(results.rows[0])
  }catch (error) {
    res.status(400).json( { error: error.message } )
  }
}

export default {

  getGifts, getGiftById, createGift, updateGift, deleteGift
}
