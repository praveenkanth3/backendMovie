// let mongoose = require("mongoose");
// let user = mongoose.model("users");


// exports.list_all_user = (req, res) => {
//     user.find({}, (err,user) => {
//         if(err) {
//             res.send(err)
//         } else {
//             res.json(user)
//         }
//     });
// };

// exports.create_user = (req, res) => {
//     var new_user = new user(req.body);
//     new_user.save((err, user) => {
//         if(err) {
//             res.send(err)
//         } else {
//             res.json(user)
//         }
//     });

// };