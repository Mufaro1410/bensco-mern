const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Please enter firstname'],
    },
    lastname: {
        type: String,
        required: [true, 'Please enter lastname'],
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
    },
    dob: {
        type: String,
        required: [true, 'Please enter date-of-birth'],
    },
    address: {
        type: String,
        required: [true, 'Please enter address'],
    },
    role: {
        type: String,
        required: [true, 'Please enter role'],
    },
    username: {
        type: String,
        required: [true, 'Please enter username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    }
}, {timestamps:true})

userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name:this.username}, process.env.JWT_SECRET , {expiresIn:process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('Users', userSchema)