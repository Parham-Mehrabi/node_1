
module.exports = function(e, req, res, next){
    // Log the Error
    console.log(e)
    return res.status(500).send('Internal Server Error.')
}
