const errorHandler = (logStream) => {
    return (err, req, res, next) => {
        logStream.write(err.stack);
        res.status(500).json({message: "Error occured."});
    }
}

module.exports = errorHandler;