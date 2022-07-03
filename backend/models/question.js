const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// speakers: {
//     type: [
//         {
//             type: Schema.Types.ObjectId,
//             ref: 'User',
//         },
//     ],
//     required: false,
// },

const quesSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    ownerid: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    status: { type: String, default: 'unsolved' },
    comments: {
        type: [
            {
                // type: Schema.Types.ObjectId,
                // ref: 'User',
                type: String
            }
        ]
    },
    answer: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Question', quesSchema, 'questions');