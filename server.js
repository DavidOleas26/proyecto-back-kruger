import express from 'express' 
import { connectDB } from './db/db.js'
import flatRouter from './routes/flat.router.js'

const app = express()
app.use(express.json())
app.disable('x-powered-by') 

connectDB()

app.use('/flats', flatRouter);

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

