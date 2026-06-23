require('dotenv').config();

const connectDB = require('./config/connectDB')
const app = require('./app');

require('dns').setServers([
   '1.1.1.1',
   '8.8.8.8'
]);
connectDB();

const PORT = process.env.PORT

app.listen(PORT, () => {
   console.log(`Server started on http://localhost:${PORT}`)
})
