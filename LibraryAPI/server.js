const express = require('express');
const mongoose = require('mongoose');

const bookrouter = require('./routers/bookRouter');
const mbookrouter = require('./routers/mBookRouter');
const userrouter = require('./routers/userRouter');

const verfiyToken = require('./middleware/authmiddleware')

const app = express();
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then( () => console.log('Connected to database....'))
.catch( e => console.error('Couldn\'t connect to Mongodb...', e));

const port = 3000;

// static in-memory books
app.use('/books', bookrouter)
// mongodb books
app.use('/mbook', verfiyToken, mbookrouter)
// user
app.use('/user', userrouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});