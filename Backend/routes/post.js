const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const RateLimit = require('express-rate-limit');
const axios = require('axios').default;
const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5
});

// apply rate limiter to all requests
router.use(limiter);

router.get('/allpost', requireLogin, (req, res) => {
    Post.find().select("body -_id")
    /*   .populate("postedBy","_id name email")
    .populate("comments.postedBy","_id name")
    
    .sort('-createdAt') */.then((posts) => {
        let result = [...(posts.map(el => el.body))];
        res.json(posts)
    }).catch(err => {
        console.log(err)
    })

})


router.post('/createpost', requireLogin, (req, res) => {
    const {title, body, amount} = req.body
    if (!title || !body || !amount) {
        return res.status(422).json({error: "Please add all the fields"})
    }
    req.user.password = undefined
    const post = new Post({title, body, amount, postedBy: req.user})
    post.save().then(result => {
        res.json({post: result})
    }).catch(err => {
        console.log(err)
    })
})

router.get('/mypost', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id}) // .select("body amount -_id")
    .then(mypost => {

        let coinList="";
        mypost.forEach(element => {           
            coinList += element.body + "%2C";         
        });
        coinList=coinList.substring(0,coinList.length-3);
console.log(coinList);
if(coinList)
{
    console.log("test")
    let apiLink = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids="+coinList+"&order=market_cap_desc&per_page=10&page=1&sparkline=false";
    axios.get(apiLink).then((result) => {
        y=JSON.parse(JSON.stringify(result.data));

        for(var k in result.data) {
            //Navigate in every element of the user coins
            mypost.forEach(element => {
                 //Condition to see if the user's coin name is the same of the api so we add his amount to the api   
                if(element.body == result.data[k].id)
                {                     
                    result.data[k].useramount = element.amount;
                    result.data[k].idPost = element._id;
                }
                
            });
  
         }
        //console.log(coinList);
        //console.log(JSON.parse(JSON.stringify(result.data)).bitcoin);
        res.json(JSON.parse(JSON.stringify(result.data)))
        //res.json(JSON.parse(JSON.stringify(mypost)))
        //[1].body
    });
}
else{
    res.json("No Post");
}
       

    }).catch(err => {
        console.log(err)
    })
})

router.get('/topcoins', (req, res) => {
    let apiLink = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
        axios.get(apiLink).then((result) => {

            res.json(JSON.parse(JSON.stringify(result.data)))

        }).catch(err => {
        console.log(err)
    })
})

// router.get('/mypost', requireLogin, (req, res) => {
//     Post.find({postedBy: req.user._id}) // .select("body amount -_id")
//     .then(mypost => {
//         /*  let header = {
//                 "headers": {
//                     'Authorization': `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk1MWYwNGY0MWZmOTQwMTQ0MDEzMmIiLCJpYXQiOjE2MzcxNjI3Njh9.D0Hk0ORdTZdwLHC4QnfQ606ggKH6RtfZpMKQCYVX9C4`
//                 }
//             }
//         */
//         let coinList="";
//         mypost.forEach(element => {
            
//             coinList += element.body + "%2C";
            
//         });
//         coinList=coinList.substring(0,coinList.length-3);
//        // console.log(coinList);
//        // console.log(req.body.title);
//         let apiLink = "https://api.coingecko.com/api/v3/simple/price?ids="+coinList+"&vs_currencies=usd%2Ceur";
//         axios.get(apiLink).then((result) => {
//             y=JSON.parse(JSON.stringify(result.data));
//             let counterOfCoinList=0;
//             for(var k in result.data) {
//                 console.log(counterOfCoinList);
//                 result.data[k].symbol = mypost[counterOfCoinList].title;
//                 result.data[k].useramount = mypost[counterOfCoinList].amount;
//                 result.data[k].image = mypost[counterOfCoinList].pic;

//                 console.log(result.data[k]);
//                 counterOfCoinList++;
//              }
//             //console.log(y);
//             //console.log(JSON.parse(JSON.stringify(result.data)).bitcoin);
//             res.json(JSON.parse(JSON.stringify(result.data)))
//             //res.json(JSON.parse(JSON.stringify(mypost)))
//             //[1].body
//         });

//     }).catch(err => {
//         console.log(err)
//     })
// })


// router.get('/mypost',requireLogin,(req,res)=>{
//     Post.find({postedBy:req.user._id})
//     .populate("PostedBy","_id name")
//     .then(mypost=>{
//         res.json({mypost})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {
            likes: req.user._id
        }
    }, {new: true}).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        } else {
            res.json(result)
        }
    })
})
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {
            likes: req.user._id
        }
    }, {new: true}).exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        } else {
            res.json(result)
        }
    })
})


router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {
            comments: comment
        }
    }, {new: true}).populate("comments.postedBy", "_id name").populate("postedBy", "_id name").exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        } else {
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id: req.params.postId}).populate("postedBy", "_id").exec((err, post) => {
        if (err || !post) {
            return res.status(422).json({error: err})
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
            post.remove().then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })
})

module.exports = router
