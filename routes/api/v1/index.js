const express =require('express');
const router=express.Router();

const post_api_controller=require('../../../controllers/api/v1/post_api');

router.get('/post',post_api_controller.posts);
router.delete('/delete',post_api_controller.delete)

module.exports=router;