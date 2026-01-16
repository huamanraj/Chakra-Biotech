const mongoose = require('mongoose');
const slugify = require('../utils/slugify');

const galleryCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

galleryCategorySchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }
  next();
});

module.exports = mongoose.model('GalleryCategory', galleryCategorySchema);
