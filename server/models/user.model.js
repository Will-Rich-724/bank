const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const Account =require("./account.model");

const AccountSchema = new mongoose.Schema ({
    nickName: {
        type: String,
    },
    accountType: {
        type: String,
        enum: ['Savings', 'Checking', 'Retirement', 'Investment']
    },
    balance: {
        type: Number,
    } 
})

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require: [true, "A first name is required"],
            minlength: [2, "first Name must have at least two letters"]
        },
        lastName: {
            type: String,
            require: [true, "A last name is required"],
            minlength: [2, "last Name must have at least two letters"]
        },
        email: {
            type: String,
            require: [true, "An email is required"],
            minlength: [2, "email must have at least two letters"]
        },
        password: {
            type: String,
            require: [true, "A password is required"],
            minlength: [2, "password must have at least two characters"]
        },
        accounts: {
            type: [AccountSchema],
            default: undefined,
        }
    },
    { timestamp: true}
);

UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => (this._confirmPassword = value));

UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password")
    }
    next();
});

UserSchema.pre("save", function(next) {
    bcrypt
        .hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model("User", UserSchema);

module.exports = User

