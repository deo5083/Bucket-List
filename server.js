const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bucketListItemRoutes = require('./routes/api/bucketListItems')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())
app.use(morgan('tiny'))

mongoose
    .connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err))

app.use('/api/bucketListItems', bucketListItemRoutes)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
