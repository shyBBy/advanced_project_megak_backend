import 'dotenv/config'
import * as express from "express";
import 'express-async-errors';
import './utils/db';
import rateLimit from "express-rate-limit";
import * as cors from "cors";
import {adRouter} from "./routers/ad";
import {Router} from "express";
import {config} from "./config/config";


const app = express();
app.use(express.json());
app.use(cors({
    origin: config.corsOrigin,
}));
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))

const router = Router();

// app.use('/ad', adRouter);
router.use('/ad', adRouter);
app.use('/api', router);

app.listen(3002, '0.0.0.0', () => {
    console.log(`App started at http://localhost:3002`);
});
