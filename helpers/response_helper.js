const RESPONSE = ({ error, message, res, status,data }) =>{
    res.status(status).send({
        error,
        status,
        message,
        data
    })
}

module.exports = {
    RESPONSE
}