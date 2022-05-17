// Import mongoose database Connection
// MESSAGE MODEL
const db = require('../../database/mongo/connection');
const Schema = db.mongoose.Schema;

const fileStorageSchema = new Schema({
    'fileName': {
        type: String
    },
    'fileType': {
        type: String, 
    },
    'fileSize': {
        type: Number, 
    },
    'filePath':{
        type : String
    },
    'updatedAt': {
        type: Date,
        default: Date.now
    },
});

const fileStorageModel = db.mongoose.model('fileStorageModel', fileStorageSchema, 'fileStorage');
module.exports = fileStorageModel;