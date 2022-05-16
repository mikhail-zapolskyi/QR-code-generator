import 'dotenv/config';
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
     res.status(200).send('hELlo')
})

app.listen(port, () => {
     console.log(`App listening at http://localhost:${port}`)
})
