import App from './app'
const dotenv = require('dotenv')
dotenv.config()
const app = new App(process.env.PORT);
app.listen()
