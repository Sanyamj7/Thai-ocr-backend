const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const DataSchema = new Schema({
    identificationNumber:String,
    name:String,
    LastName:String,
    dateOfBirth:String,
    DateofIssue:String,
    DateofExpiry:String
});

module.exports=mongoose.model('Data',DataSchema)