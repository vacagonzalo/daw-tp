import express from 'express';
import * as CORS from 'cors';
import root from './routes/root';
import dispositivos from './routes/dispositivos';
import riegolog from './routes/logRiego';
import mediciones from './routes/mediciones';

const app: express.Application = express();
const port: number = 5000;

var cors = require('cors');
const corsConfig: CORS.CorsOptions = { origin: "*", optionsSuccessStatus: 200 };

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.set('port', process.env.PORT || port);
app.listen(app.get('port'), () => {
    console.log('server running on port ' + app.get('port'));
});

app.use(cors(corsConfig));
app.use(root);
app.use(dispositivos);
app.use(riegolog);
app.use(mediciones);