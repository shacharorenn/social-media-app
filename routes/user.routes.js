let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

let user = require('../models/user-schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/create').post((req, res, next) => {
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        req.body.password = hash;
        user.create(req.body, (error, data) => {
            if (error) {
                return next(error)
            } else {
                console.log(data)
                return res.json(data)
            }
        })
    });
});
router.route('/login').post((req, res, next) => {
    user.find({ email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            console.log("Auth failed");
            return res.status(401).json({
                message: 'Auth failed'
            });
        }

        bcrypt.compare(req.body.password,user[0].password).then((result)=>{
            if(result){
                const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        "secret",
                        {
                            expiresIn: "1h"
                        }
                    );
                console.log("authentication successful")
                        return res.status(200).json({
                            message:'Auth successful',
                            token: token
                        });
            } else {
              console.log("authentication failed. Password doesn't match")
              return res.status(401).json({
                  message: 'Auth failed'
              });
            }
          })
          .catch((err)=>console.error(err))
    })
});

// router.route('/').get((req, res) => {
//     debugger;
//     user.find((error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })

// router.route('/edit/:id').get((req, res) => {
//     user.findById(req.params.id, (error, data) => {
//         if (error) {
//             return next(error)
//         } else {
//             res.json(data)
//         }
//     })
// })


// router.route('/update/:id').put((req, res, next) => {
//     user.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     }, (error, data) => {
//         if (error) {
//             return next(error);
//             console.log(error)
//         } else {
//             res.json(data)
//             console.log('User updated successfully !')
//         }
//     })
// })

// router.route('/delete/:id').delete((req, res, next) => {
//     user.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 msg: data
//             })
//         }
//     })
// })




module.exports = router;