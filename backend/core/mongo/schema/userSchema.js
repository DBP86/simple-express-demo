const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  dob: Date,
  address: String,
  description: String,
  location : {
    type: Array,
    sparse: true
  } 
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

userSchema.index({ location: '2dsphere' });

mongoose.model('user', userSchema);
