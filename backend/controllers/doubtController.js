const Joi = require('joi');
const Question = require('../models/question');
const User = require('../models/user');

class DoubtController {
    async askDoubt(req, res) {
        //validate the req
        const doubtSchema = Joi.object({
            title: Joi.string().required(),
            desc: Joi.string().required()
        })
        const { title, desc } = req.body;
        const { error } = doubtSchema.validate({ title, desc });
        if (error) {
            return res.json(error.message);
        }
        //create model
        const question = new Question({
            title,
            desc,
            ownerid: req.user._id,
        })
        //store the ques in db
        try {
            const result = await question.save();
        } catch (err) {
            return res.json(err);
        }
        res.json({ status: 1 });
    }
    async question(req, res) {
        let questions;
        try {
            questions = await Question.find().populate('ownerid').exec();
        } catch (err) {
            return res.json({ message: err.message });
        }
        res.json(questions);
    }
}

module.exports = new DoubtController();