const express = require('express');
const router = express.Router();

 function validateUser(req, res, next){
    res.locals.validated = true;
    console.log('validated!')
    next()
 }

 router.use(validateUser)

router.get('/', (req, res, next) => {
    res.send({
        msg: 'User router'
    })
})



module.exports = router;