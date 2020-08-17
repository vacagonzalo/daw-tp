import express from 'express';
const root: express.Router = express.Router();

root.get('/', (req: express.Request, res: express.Response) => {
    res.send('root works');
});

export default root;