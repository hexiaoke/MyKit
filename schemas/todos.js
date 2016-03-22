/**
 * Created by heke on 16/3/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var  ObjectId=Schema.Types.ObjectId;
var TodoSchema = new mongoose.Schema({
    title:String,
    content: String,
    user_id:{
      type:ObjectId,
      ref:'User'
    },
    completed:{
        type:Boolean,
        default:false
    },
    deleted:{
        type:Boolean,
        default:false
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

TodoSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    next();
});


TodoSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb)
    }
};

module.exports = TodoSchema;