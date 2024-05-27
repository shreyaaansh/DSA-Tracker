const { model, Schema } = require('mongoose');

const UserLoginSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

const UserAuthModel = model('UserAuthModel', UserLoginSchema);

module.exports = { UserLoginSchema, UserAuthModel };
