const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');
const routes = require('./routes');

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

var env = nunjucks.configure('views', {noCache:true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', routes);

models.db.sync({ force: true })
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

