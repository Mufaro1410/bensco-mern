const User = require('../model/users')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const login = async (req, res) => {
    const {username, password} = req.body
    if (!username || !password) {
        throw new BadRequestError('Please provide username and password')
    }
    const user = await User.findOne({username})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.username}, token})
}

module.exports = {
    login
}