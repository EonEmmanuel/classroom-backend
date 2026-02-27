import express from 'express';
import subjectsRouter from './routes/subjects';
import cors from 'cors';
import securityMiddleware from "./middleware/security";


const app = express();
const port = 8000;

if(!process.env.FRONTEND_URL) {
  console.warn('FRONTEND_URL is not defined. CORS may not work as expected.');
}

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter)

app.get('/', (req, res) => {
  res.send('Hello from the Classroom API!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});