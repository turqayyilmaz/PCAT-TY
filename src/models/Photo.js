const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');
const mongoosePaginate = require('mongoose-paginate-v2');

const PhotoSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    image: String,
    slug: { type: String, unique: true },
  },
  { timestamps: {} }
);
PhotoSchema.plugin(mongoosePaginate);

PhotoSchema.pre('validate', function (next) {
  this.slug = slugify(this.title, {
    lower: true,
    strict: true,
  });
  next();
});
const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;
