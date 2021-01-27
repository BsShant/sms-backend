import * as express from 'express'
import * as logger from 'morgan'
import * as cors from 'cors'
import * as path from 'path'
import { createError } from 'http-errors';
import Routes from './routes/index'
import * as mongoose from 'mongoose'
class App {
  public app: express.Application;
  public port: number;
  constructor(port) {
    this.app = express()
    this.port = port
    this.connectToTheDatabase();
    this.initializeMiddleware()
    this.initializeRoutes()
    this.finalizeMiddleware()
  }
  private initializeMiddleware() {
    this.app.use(logger('dev'))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(path.join(__dirname, 'public')))
  }
  private initializeRoutes() {
    this.app.use('/api', Routes)
  }
  private finalizeMiddleware() {
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    // Error Handler Middleware
    this.app.use(function (err, req, res, next) {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.status(err.status || 500);
      res.json({
        msg: err.msg || 'Error from error handling middleware',
        status: err.status || 500,
      });
    });
  }

  private connectToTheDatabase() {
    const {
      MONGO_USER,
      MONGO_PASSWORD,
      MONGO_PATH,
    } = process.env;
    mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
      console.log(`Database is Connected Successful`)
    }).catch(e => {
      console.log("Error in Connecting Database")
    })
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on this port ${this.port}`)
    })
  }

}

export default App