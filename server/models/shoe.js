const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug)

const Shoe = new Schema({
    name: { type: String, maxLength: 255 },
    price: { type: Number, maxLength: 355 },
    image: { type: String, maxLength: 255 },
    state: {type: Number},
    slug: { type: String, slug: 'name', unique: true}
}, {
    timestamps: true,
})

module.exports = mongoose.model('Products',Shoe);