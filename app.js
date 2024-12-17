import express from 'express';
import morgan from 'morgan';

import { join, dirname} from 'path';
import { fileURLToPath } from 'url';

import router from './router.js';


const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(express.json({ limit: '5mb' }))


app.use(express.static(__dirname));  // Sirve archivos estáticos desde la raíz
app.use( express.static(join(__dirname, './login')))
app.use( express.static(join(__dirname, './login2')))

app.use(router)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, './index.html'))
});

app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
    console.log('http://localhost:' + app.get('port'));
});