module.exports = app => {
    var router = require("express").Router();
    const authValidator = require('../validators/auth.validator');
    const vendorValidator = require('../validators/vendor.validator')
    const vendorController = require('../controllers/vendor.controller')
    const bloomValidator = require('../validators/bloomCategoty.validator')
    const auth = require('../controllers/auth.controller');
    const challengeCategory = require('../controllers/challengeCategory.controller');
    const bloomCategory = require('../controllers/bloomCategory.controller');
    const postValidator = require('../validators/post.validator');
    const posts = require('../controllers/post.controller');
    const story = require('../controllers/story.controller');
    const followerValidator = require('../validators/follower.validator');
    const followers = require('../controllers/follower.controller');
    const rewardValidator = require('../validators/rewards.validator');
    const rewardsController = require('../controllers/rewards.controller');
    const participate = require('../controllers/user.participate')
    const accountSettingValidator = require('../validators/accountSetting.validator')
    const accountSetting = require('../controllers/accountSetting')
    const adminController = require('../controllers/admin.controller')
    const listing = require('../controllers/listing.controller')
    const listingUser = require('../controllers/listingUser.controller')
    const total = require('../controllers/totalCount');
    const upload = require('../config/fileUpload')
    const uploadV = require("../config/videoMulter")
    const notification = require('../cron/notification.cron')
    const { jwt, errorHandler } = require('../utils/jwt');
    const chatController = require('../controllers/chat.controller')
    const chatValidator = require('../validators/chat.validator');

    const multer = require('multer');
    const upload1 = multer();
    // const uploadu = require("../config/multer")
    //TOTAL COUNT
    router.get("/all/total", total.total);
    router.get("/all/bloom", total.bloomCount)
    router.get("/notificationcron", notification.sendNotification)

    router.get('/api', auth.api)


    //AUTH ADMIN
    router.post('/admin/login', adminController.login);

    //AUTH VENDOR
    router.post('/vendorlogin', vendorValidator.vendorLogin, vendorController.login);
    router.post('/vendorsignup', vendorValidator.vendorSignup, vendorController.signUp);

    //AUTH USER
    router.post('/login', authValidator.login, auth.login);
    router.post('/signup', upload1.none(), authValidator.signUp, auth.signUp);

    //BLOOM QUESTION
    router.get("/question/:id", bloomCategory.bloomQuestion);

    // -----------------------------------------------------------------------------------------------------
    router.use(errorHandler);
    router.use(jwt);
    // -----------------------------------------------------------------------------------------------------
    //All Listing for user
    router.get('/bloom_category/list', listingUser.bloomCategoryList);
    router.get('/bloom/list', listingUser.bloomList);
    router.get('/challenge_category/list', listingUser.challengeCategoryList);
    router.get('/challenge/list', listingUser.challengeList);
    router.get('/post/list', listingUser.postList);
    router.get('/reward/list', listingUser.rewardList);
    router.get('/reward_category/list', listingUser.rewardCategoryList);
    router.get('/vendor/list', listingUser.vendorList);
    router.get('/user/list', listingUser.userList);


    //All Listing for admin
    router.get('/bloom_category/admin/list', listing.bloomCategoryList);
    router.get('/bloom/admin/list', listing.bloomList);
    router.get('/challenge_category/admin/list', listing.challengeCategoryList);
    router.get('/challenge/admin/list', listing.challengeList);
    router.get('/post/admin/list', listing.postList);
    router.get('/reward/admin/list', listing.rewardList);
    router.get('/reward_category/admin/list', listing.rewardCategoryList);
    router.get('/vendor/admin/list', listing.vendorList);
    router.get('/user/admin/list', listing.userList);
    router.get('/report/admin/list', listing.reportList);
    router.get('/impact/admin/list', listing.impactList);

    // VENDOR INFO
    router.post('/vendor/addreward', upload.single('image'), vendorValidator.vendorRewards, vendorController.vendorReward);


    router.post('/test', vendorController.test);
    router.post('/vendor/request', vendorController.acceptVendorRequest);
    router.get('/vendorreward/list', vendorController.addRewardByVendorlist);
    router.delete('/vendor/deletemultiplereward', vendorController.deleteMultipleRewards);
    router.delete('/vendor/deletesinglereward/:id', vendorController.deleteSingleRewards)
    router.get('/vendor/reward_category/list', vendorController.rewardCategoryListInVendor);

    // USER INFO
    router.get('/userdata', auth.allUserData);
    router.get('/user_details/:id', auth.UserDetailsById);
    router.get('/info', auth.getUserData);
    router.put('/updateuser', auth.updateUserData);
    router.put('/profile-img', upload.single('profile_img'), auth.updateProfileImg);
    router.put('/reset-password', auth.resetPassword);
    // authValidator.changePassword,
    router.delete('/deleteuser/:id', auth.deleteUser);
    router.post('/block/:id', auth.userBlocked);
    router.get('/blocked', auth.blockedUsers);


    // BLOOM CATEGORY
    router.get('/bloom_category/detail', bloomCategory.listOfBloomByCategory)
    router.post('/bloom_category/bloom', upload.single('image'), bloomValidator.bloom, bloomCategory.userBloomCategory);

    // router.post('/bloom_category/create_post', posts.createPost);
    router.get("/user_dashboard/bloom", total.bloomUnitActiveTotalCount)
    router.post('/bloom/answer/:id', bloomCategory.bloomAnswer)
    router.get('/mybloom', bloomCategory.myBloom);

    // CHALLANGE CATEGORY
    router.get('/challenge_category/detail', challengeCategory.listOfChallengeCategory);
    router.post('/challenge_category/challenge', bloomValidator.challenge, challengeCategory.userChallengeCategory)
    router.get('/challenge/leader_board', challengeCategory.listOfChallengeLeader);
    router.get('/mychallenges', challengeCategory.myChallenges);


    // POSTS
    router.post('/posts/create_post', upload.single('image'), posts.create);
    router.post('/posts/video', uploadV.single("videos"), posts.postVideo)
    router.get('/posts/list', posts.listOfPosts);
    router.post('/posts/like_unlike', postValidator.likeUnlike, posts.postLikeUnlike);
    router.delete('/post/delete/:id', posts.postDelete);

    router.post('/posts/add_comment', postValidator.addComment, posts.addComment);
    router.get('/posts/comment', posts.comments);
    router.post('/comment/like/:id', posts.likeComment);
    router.get('/posts/myposts', posts.myPosts);
    router.post('/posts/report', posts.reportPost);

    router.post('/posts/save_post', posts.savePost);
    router.get('/posts/saved_post_list', posts.listOfSavedPost);

    // STORY
    router.post('/story/create_story', upload.single('image'), story.create);
    router.post('/story/video', uploadV.single("videos"), story.storyVideo)
    router.get('/story/list', story.listOfStory);


    // Notification
    router.get('/notifications', auth.listOfNotification);
    router.post('/like/on-off', posts.likeNotificationOnOff);
    router.post('/comment/on-off', posts.commentNotificationOnOff);
    router.post('/follower-request/on-off', posts.followerRequestOnOff);
    router.post('/accept-follow-request/on-off', posts.acceptFollowRequestOnOff);
    router.post('/profile-private', posts.profilePrivate);
    router.get("/total/notification", total.notificationCount)
    router.get("/seen/:id", total.getNotificationById)
    router.get("/notification_satus", total.getNotificationStatus)


    // FOLLOWERS
    router.post('/follower/send_request', followerValidator.sendRequest, followers.sendRequest);
    router.post('/follower/unfollow', followers.unfollowUser);

    router.get('/follower/follow_request_list', followers.followRequestList);
    router.post('/follower/update_status', followerValidator.updateStatus, followers.updateStatus);
    router.get('/follower/followers_list', followers.listOfFollowers);
    router.get('/follower/following_list', followers.listOfFollowing);
    router.post('/follower/delete_follow_request', followers.deleteFollowRequest);
    router.get('/follower/count', followers.followersCount);

    // REWARDS
    router.get('/reward/category_list', rewardsController.rewardCategoryList);
    // router.get('/myreward', rewardsController.myRewards);
    router.post('/reward/add_user_reward', rewardValidator.addUserReward, rewardsController.addUserReward);
    router.post('/add/reward/multiple', upload.single('image'), rewardsController.addMultipleReward);
    router.get('/reward/claim', rewardsController.getUserReward);

    // USER PARTICIPATE
    router.get('/participate', participate.userParticipateList);

    // Account Setting
    router.post('/account_setting', accountSettingValidator.account, accountSetting.accountSetting)
    router.get('/listing', accountSetting.list)

    //  activate vendor by admin
    router.post('/vendor/activate/:id', adminController.activateVendor);
    router.get('/vendor/:id', adminController.getVendorById)
    router.post('/user/activate/:id', adminController.activateUser);
    router.get('/user/:id', adminController.getUserById)

    // add by admin
    router.post("/admin/add/vendor", adminController.addVendorByadmin)
    router.post('/admin/add/bloom_category', adminController.addBloomCategory);
    router.post('/admin/add/reward_category', adminController.addRewardCategory);
    router.put('/admin/update/bloom_category/:id', adminController.updateBloomCategory);
    router.put('/admin/update/reward_category/:id', adminController.updateRewardCategory);
    router.post('/admin/add/bloom', adminController.addBloom);
    router.post('/admin/add/reward', adminController.addReward);
    router.post('/admin/add/challenge', adminController.addChallenge);
    router.put('/admin/update/bloom/:id', adminController.editBloom);
    router.get('/admin/get/bloom/:id', adminController.getBloomById);
    router.get('/admin/get/challenge/:id', adminController.getChallengeById);
    router.get('/admin/get/bloom_category/:id', adminController.getBloomCategoryById)
    router.get('/admin/get/Reward_category/:id', adminController.getRewardCategoryById)
    router.get('/admin/get/reward/:id', adminController.getRewardById)
    router.post('/admin/add/challenge_category', adminController.addChallengeCategory);
    router.put('/admin/update/challenge/:id', adminController.editchallenge);
    router.put('/admin/update/reward/:id', adminController.editReward);
    router.delete('/admin/delete/bloomcategory/:id', adminController.deleteBloomCategory);
    router.delete('/admin/delete/bloom/:id', adminController.deleteBloom);
    router.delete('/admin/delete/challengecategory/:id', adminController.deleteChallengeCategory);
    router.delete('/admin/delete/challenge/:id', adminController.deleteChallenge);
    router.delete('/admin/delete/post/:id', adminController.deletePost);
    router.delete('/admin/delete/rewardcategory/:id', adminController.deleteRewardCategoryById);
    router.delete('/admin/delete/reward/:id', adminController.deleteRewardById);
    router.delete('/admin/delete/user/:id', adminController.deleteUserById);



    router.get("/total/notification", total.notificationCount)

    /* CHAT */
    router.post('/chat/save_message', chatController.saveMessage);
    router.get('/chat/message_list', chatController.listMessage);
    router.get('/chat/recent_user', chatController.recentMessageUsers);
    router.post('/chat/share_post',chatValidator.sharePost,chatController.saveSharePost);
    
    router.delete('/admin/delete/report/:id', adminController.deleteReportById);


    app.use('/user', router);

}
