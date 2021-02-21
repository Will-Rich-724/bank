const User = require("../models/user.model");
// const Account = require("../models/account.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register(req, res) {
        const user = new User(req.body);

        user
            .save()
            .then(() => {
                res.json({ msg: "success!", user: user});
            })
            .catch(err => res.status(400).json(err));
    },

    login(req, res) {
        User.findOne({ email: req.body.email})
            .then(user => {
                if (user === null) {
                    res.status(400).json({ msg: "invalid login attempt"});
                } else {
                    bcrypt
                        .compare(req.body.password, user.password)
                        .then(passwordIsValid => {
                            if(passwordIsValid) {
                                res
                                    .cookie(
                                        "usertoken",
                                        jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
                                        {
                                            httpOnly: true
                                        }
                                    )
                                    .json({ msg: "Success!", _id: user._id});
                            } else {
                                res.status(400).json({ msg: "invalid login attempt" })
                            }
                        })
                        .catch(err => 
                            res.status(400).json({ msg: "invalid login attempt "})
                        );
                }
            })
            .catch(err => res.json(err));
    },

    logout(req, res) {
        res
            .cookie("usertoken", jwt.sign({ _id: ""}, process.env.JWT_SECRET), {
                httpOnly: true,
                maxAge: 0
            })
            .json({ message: "ok"});
    },

    getAll(req, res) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err));
    },

    getOne(req, res) {
        User.findOne({ _id: req.params.id })
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    deleteUser(req, res) {
        User.deleteOne({ _id: req.params.id})
            .then(results => res.json(results))
            .catch(err => res.json(err));
    },

    getOneAccount(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.json(err);
            res.json(user.accounts.id(req.params.account_id));
        });
    },

    createAccount (req, res) {
        User.updateOne({ _id: req.params.id}, {'$push': {accounts: { '$each': [req.body]}}}, {session: null})
            .then(newAccount => res.json(newAccount))
            .catch(err => res.json(err));
    },

    updateOneAccount (req, res) {
        User.findOneAndUpdate({_id: req.params.user_id, 'accounts._id': req.params.account_id},
        {
            $set: {
                'accounts.$.balance' : req.body.balance
            }
        }, {new:true, useFindAndModify: false})
        .then(newUser => {res.send(newUser.accounts)})
        .catch(err => res.send(err))
    }

};