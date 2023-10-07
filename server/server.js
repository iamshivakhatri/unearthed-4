import express from 'express'
import cors from 'cors'
import './config/dotenv.js'
import giftsRouter from './routes/gifts.js'

// instantiate express for use in the app
const app = express()

// it allows us to make requests from one domain to another domain
app.use(cors())

// it allows us to parse json data from incoming requests into the req.body object
app.use(express.json())

// app.use('/public', express.static('./public'))
// app.use('/scripts', express.static('./public/scripts'))

app.use('/gifts', giftsRouter)

app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>')
})

const PORT = process.env.PORT || 3001
    
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})