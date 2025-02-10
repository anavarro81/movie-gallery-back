import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express is working!');
})

app.listen(process.env.PORT, () => {
    console.log(`[Server]: Server is running on port ${process.env.PORT}`);
})