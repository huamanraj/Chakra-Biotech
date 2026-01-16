const mongoose = require('mongoose');

const companyDetailsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alternatePhone: { type: String },
  whatsappNumber: { type: String, required: true },
  
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String
  },
  
  businessHours: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  
  aboutUs: { type: String },
  mission: { type: String },
  vision: { type: String },
  
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('CompanyDetails', companyDetailsSchema);
