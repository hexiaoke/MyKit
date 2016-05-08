/**
 * Created by heke on 16/5/8.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var  ObjectId=Schema.Types.ObjectId;
var MoneySchema=new mongoose.Schema({
    in:Number,
    out:Number,
    info:String,
    remark:String,
    date:String,
    sortDate:Date,
    remarks:String,
    user_id:{
        type:ObjectId,
        ref:'User'
    },
});
MoneySchema.pre('save', function(next) {
    this.sortDate=new Date(this.date);
    next();
});

MoneySchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('sortDate')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = MoneySchema;