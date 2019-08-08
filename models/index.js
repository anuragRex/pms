import mongoose from 'mongoose';

const Social = mongoose.model('Social', new mongoose.Schema({
    associations : {
        type : [String],
        required : true,
    },
    selfEvaluation : String,
    productServices : String,
    competitor : String,
    partnerships : String
}));

export default Social;