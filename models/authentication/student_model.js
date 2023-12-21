// for tutorial we use this student model instead since it is more simple
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const studentSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        validate: {
            validator: (v) => {
                return v.length > 8
            },
            message: 'password is too short'
        }
    }
})
studentSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        {
          _id: this._id,
          email: this.email,
        },
        config.get("JWT_SECRET_KEY")
      );
      return token;
}
const AuthStudent = mongoose.model('AuthStudent', studentSchema)

module.exports = AuthStudent
