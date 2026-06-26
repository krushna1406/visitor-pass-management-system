const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes')
const visitorRoutes = require('./routes/visitorRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
   res.status(200).json({
      message: 'Home Page'
   })
})

app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/users', userRoutes);

module.exports = app;