const jwt = require('jsonwebtoken')
const User = require('../../../models/user')
const nodemailer = require("nodemailer")
const Members = require('../../../models/members')
var request = require('request');
const config = require('../../../config');
const crypto = require('crypto')

var sesTransport = require('nodemailer-ses-transport');

var SESCREDENTIALS = {
    accessKeyId: "AKIA3OKRZPIAMSX2LH7Q",
    secretAccessKey: "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",
};

var transporter = nodemailer.createTransport(sesTransport({


    accessKeyId: "AKIA3OKRZPIAMSX2LH7Q",
    secretAccessKey: "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",


}));

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/

exports.register = (req, res) => {
    const {
        password,
        userName,
        firstName,
        lastName,
        emailAddress,
        countryOfPractice,
        lawFirmSize,
        phoneNumber,
        admin
    } = req.body


    // let admin = req.body.admin ? true:false
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        if (user) {
            throw new Error('Email Address exists')
        } else {
            return User.create(
                userName,
                password,
                firstName,
                lastName,
                emailAddress,
                countryOfPractice,
                lawFirmSize,
                phoneNumber,
                admin,
            )

        }
    }

    // count the number of the user
    const count = (user) => {
        console.log({ user })

        var url = "https://precedentonline.com" + '/verified/' + user._id;

        var userEmail = user.emailAddress;
        var emailText = `<p>Hi ${user.firstName}</p><p>Thanks for registering with Precedent Online. Please <a href="${url}">click here</a> to verify your account and start using our portal.</p><p>Regards</p>The Precedent  Support Team`



        //   emailText += '<p><a href="'+url+'">click here</a>';
        var mailOptions = {
            from: 'Precedent Online <admin@precedentonline.com>',
            to: userEmail,
            subject: 'Precedent Online | Verify Your Account',
            html: emailText
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                //   res.json({ 'success': false, 'message': error });
            }
            console.log({ 'success': true, 'message': 'email sent successfully' })

        });


        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if (count === 1) {
            return newUser.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (isAdmin) => {



        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByEmailAddress(emailAddress)
        .then(create)
        .then(count)
        .then(assign)
        .then(respond)
        .catch(onError)
}

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/

exports.login = (req, res) => {
    const {
        password,
        emailAddress,
        userName
    } = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
    const check = async (user) => {
        if (!user) {
            // user does not exist
            const member = await Members.findOne({ emailAddress })
            console.log({ member })
            if (member) {
                user = await User.findOne({ _id: member.userId })
                const p = new Promise((resolve, reject) => {
                    const encrypted = crypto.createHmac('sha1', config.secret)
                        .update(member.password)
                        .digest('base64')
                    console.log(password === encrypted)

                    if (password === encrypted) resolve(token)
                    else reject(err)

                })
                return { user, ...p }

            } else { throw new Error('login failed') }
        } else {
            // user exists, check the password
            const member = await Members.findOne({ userName })

            if (user.userName === userName || member) {
                if (user.verify(password)) {
                    // create a promise that generates jwt asynchronously
                    const p = new Promise((resolve, reject) => {
                        jwt.sign(
                            {
                                _id: user._id,
                                username: user.username,
                                admin: user.admin
                            },
                            secret,
                            {
                                expiresIn: '7d',
                                issuer: 'casemanagement',
                                subject: 'userInfo'
                            }, (err, token) => {
                                if (err) reject(err)
                                resolve(token)
                            })
                    })
                    return { user, ...p }
                } else {
                    throw new Error('login failed')
                }
            } else
                if (!member) {
                    throw new Error('Invalid username')
                }

        }
    }

    // respond the token 
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneByEmailAddress(emailAddress)
        .then(check)
        .then(respond)
        .catch(onError)

}

/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}