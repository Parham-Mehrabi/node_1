module.exports = function (func) {
    return async (req, res, next) => {
        try {
            await func(req, res);
        } catch (e) {
            next(e)
        }
    }
}
// this middleware works exactly like a python decorator and its only job is to try to do the wrapped function and if there was an error pass it to next()
// next is our other middleware (the last app.use() in index.js) that handle unexpected errors
