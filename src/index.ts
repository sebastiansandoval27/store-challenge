import express, { Express } from 'express'
import bodyParser from 'body-parser'
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from '@/middlewares/error.middleware';
import { notFoundHandler } from '@/middlewares/notFound.middleware';
import userRouter from '@/routers/user.router';

// Load environment variables from .env file
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

// Parse port to number
const PORT: number = parseInt(process.env.PORT as string, 10);

// Create Express server
const app: Express = express();

// Express configuration
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(helmet());
app.use(cors());
app.use(express.json());

// Middlewares
/* app.use(errorHandler)
app.use(notFoundHandler) */

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/users', userRouter)

app.listen(PORT || 3000, async () => {
  console.log(`Server is running at http://localhost:${PORT || 3000}`)
})