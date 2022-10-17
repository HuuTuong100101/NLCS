const Shoe = require('../models/shoe')
const fs = require('fs');
const shoe = require('../models/shoe');

module.exports = class API {
    static async showAllShoe(req, res) {
        try {
            const Shoes = await Shoe.find();
            res.status(200).json(Shoes);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async createShoe(req, res) {
        const Shoes = req.body;
        const imgname = req.file.filename;
        Shoes.image = imgname;
        try {
            await Shoe.create(Shoes);
            res.status(201).json({ message: "Create shoe successfully !" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async showShoeBySlug(req, res) {
        try {
            const shoe = await Shoe.findOne({slug:req.params.slug});
            res.status(200).json(shoe);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async updateShoe(req, res) {
        const slug = req.params.slug;
        let new_img = '';
        if (req.file) {
            new_img = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_img);
            } catch (error) {
                console.log(error)
            }
        } else {
            new_img = req.body.old_img;
        }

        const newShoe = req.body;
        newShoe.image = new_img;

        try {
            await shoe.findOneAndUpdate({slug:slug}, newShoe);
            res.status(200).json({ message: 'Shoe updated successfully!' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteShoe(req, res) {
        const slug = req.params.slug;
        try {
            const result = await Shoe.findOneAndDelete(slug);
            if(result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({ message: 'Shoe deleted successfully!' })
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
