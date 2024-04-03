import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors'
import { router } from './routes'
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(cors());
server.use(router);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
})

server.listen(3333, () => console.log("Servidor Online"));