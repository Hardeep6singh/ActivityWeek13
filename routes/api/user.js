const express = require('express')
const router = express.Router()

// Import User schema
const User = require('../../models/User')
console.log(typeof(User))

//@type     -   GET
//@route    -   /api/profile
//@desc     -   Just for testing
//@access   -   PUBLIC
router.get('/', (req, res) => res.send('User related routes'))


router.get('/form',(req,res)=>{
    res.render('form')
    })



//@type     -   GET
//@route    -   /api/profile/get
//@desc     -   Get all User record
//@access   -   PUBLIC
//@ using handlebars
router.get('/get-username',async (req,res)=>{

    const data = await User.find({});
    //let data = JSON.parse(Users); 
    res.render('data',
    {
    title:'Json data',
    data:data
    })
})



//@type     -   POST
//@route    -   /api/profile/add
//@desc     -   Insert a person record
//@access   -   PUBLIC
router.post('/add-username', (req, res) => {
    // check to keep usernames unique
    User
        .findOne({username: req.body.username})
        .then(user => {
            if (user) {
                return res
                        .status(400)
                        .send('User already exists')    
            } else {
                
                const newUser = User({
                    username: req.body.username
                })

                newUser
                    .save()
                    .then(User => res.send(User))
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
})


module.exports = router