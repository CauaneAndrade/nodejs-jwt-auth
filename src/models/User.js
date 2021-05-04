const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  vhost: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', async function (next) {
  const passwordEncrypt = await bcrypt.hash(this.password, 10)
  this.password = passwordEncrypt

  const random = Math.random().toString()
  this.vhost = crypto.createHash('sha1').update(random).digest('hex')
  next()
})

const model = mongoose.model('User', UserSchema)

module.exports = model
