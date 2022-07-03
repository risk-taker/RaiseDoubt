const Question = require("../models/question");

class CommentController {
    async makeComment(req, res) {
        // comment

        try {
            const result = await Question.findOneAndUpdate({ _id: req.body.quesId }, { $push: { comments: req.body.text } }, { new: true }).populate('comments').exec();
            return res.json({ status: 1 });
        } catch (error) {
            return res.json(error);
        }
    }
    async getComments(req, res, next) {
        const _id = req.params.id;

        let comments;
        try {
            comments = await Question.find({ _id });
        } catch (error) {
            return res.json({ error: error.message });
        }
        res.json(comments);
    }
    async giveAnswer(req, res) {
        const _id = req.params.id;
        const answer = req.body.answer;

        try {
            const result = await Question.findOneAndUpdate({ _id: _id }, { $set: { status: "Resolved", answer: answer } }, { new: true })
            return res.json(result);
        } catch (error) {

            res.json({ message: error.message });
        }
    }
    async resolved(req, res) {
        try {
            const resolved = await Question.find({ status: "Resolved" });
            return res.json(resolved);
        } catch (error) {
            return res.json({ error: error.message });
        }
    }
    async unsolved(req, res) {
        try {
            const unsolved = await Question.find({ status: "unsolved" });
            return res.json(unsolved);
        } catch (error) {
            return res.json({ error: error.message });
        }
    }
}

module.exports = new CommentController();