import express, { Application } from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());

app.use(userRoutes);

app.listen(PORT);
console.log('Server running on Port 3000');
