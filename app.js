const express = require('express');
const app = express();
const port = 8000;

const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');
const file = fs.readFileSync('./api.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const router = require('./routes');
app.use(router);

// 404 
app.use((req, res, next) => {
    return res.status(404).json({
        message: '404 Not Found!'
    });
});

// 500
app.use((err, req, res, next) => {
    return res.status(500).json({
        message: err.message
    });
});

app.listen(port, () => console.log('listening on port', port));
