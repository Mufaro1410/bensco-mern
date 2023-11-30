const usersModel = require('../model/users')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
    const {firstname, lastname, email, dob, address, role, username, password} = req.body
    // if (!firstname || !lastname || !dob || address || role || !username || !password) {
    //     throw new BadRequestError('Please provide required details')
    // }
    const body = {}
    body['firstname'] = firstname
    body['lastname'] = lastname
    body['email'] = email
    body['dob'] = dob
    body['address'] = address
    body['role'] = role
    body['username'] = username

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    body['password'] = hashedPassword

    const user = await usersModel.create(body)
    res.status(StatusCodes.CREATED).json({user: {firstname: user.firstname, lastname: user.lastname, email: user.email,
        dob: user.dob, address: user.address, role: user.role, username: user.username}})
}

const getUsers = async (req, res) => {
    const users = await usersModel.find()
    res.status(StatusCodes.OK).json({users, nbHits:users.length})
}

const getUser = async (req, res) => {
    const {id} = req.params
    const user = await usersModel.findById(id)
    if (!user) {
        throw new NotFoundError(`No user with id: ${id}`)
    }
    res.status(StatusCodes.OK).json({user})
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {firstname, lastname, email, dob, address, role, username, password} = req.body
    // if (!username && !password) {
    //     throw new BadRequestError('Please provide username or password')
    // }
    const body = {}
    body['firstname'] = firstname
    body['lastname'] = lastname
    body['email'] = email
    body['dob'] = dob
    body['address'] = address
    body['role'] = role
    body['username'] = username

    // hashing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    body['password'] = hashedPassword

    const user = await usersModel.findByIdAndUpdate(id, body, {new: true, runValidators: true})
    if (!user) {
        throw new NotFoundError(`No user with id: ${id}`)
    }
    res.status(StatusCodes.OK).json({user})
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    const user = await usersModel.findByIdAndDelete(id)
    if (!user) {
        throw new NotFoundError(`No user with id: ${id}`)
    }
    res.status(StatusCodes.OK).send('Deleted Successfully')
}

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}