const mongoose = require("mongoose")

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

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;