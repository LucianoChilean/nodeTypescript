import mongoose from 'mongoose';


const logSchema = new mongoose.Schema({

    type: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});



export const logModel = mongoose.model('log', logSchema);