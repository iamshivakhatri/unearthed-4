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

const createGift = async (req, res) => {
  try {
    const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body // TK???????
    const results = await pool.query(`
      INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, pricepoint, audience, image, description, submittedby, submittedon]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

const updateGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body // TK???????
    const INSERTQUERY = `UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon = $7 WHERE id = $8 RETURNING *`
    const VALUES = [name, pricepoint, audience, image, description, submittedby, submittedon, id]
    const results = await pool.query(INSERTQUERY, VALUES)
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}


const deleteGift = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query('DELETE FROM gifts WHERE id = $1', [id])
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(409).json( { error: error.message } )
  }
}

export default {
  getGifts,
  getGiftById,
  createGift,
  updateGift,
  deleteGift
}