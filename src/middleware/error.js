const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  
  // wrong id used
  if(err.name=='CastError'){
    const message = 'Resource could not be found';
    error = new ErrorResponse(message, 404);
  }
  //if fields are already in used
  if (err.code === 11000) {
    const message = `Duplicate field value entered at ${err.keyValue.email}`;
    error = new ErrorResponse(message, 400);
  }
  
  //if require fields are not filled
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    sucess: false,
    message: error.message || "server Error!",
  });
};

module.exports = errorHandler;
