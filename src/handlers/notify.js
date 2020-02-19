const User = require('../models/User');


module.exports = {
    async notifyFollow(req, res, next){
        try {
            const notification = {
                userId: req.body.id,
                text: `User ${req.body.userName} has started following you`
            }
            const user = await User.findById(req.body.followId);
            user.followers.push(req.body.id);
            user.notifications.push(notification);
            await user.save();
        }catch(err){
            next({
                status: 500,
                message: 'failed to notify'
             })
        }
    },
    async notifyPost(notiData){
        try {
            let text;

            switch (notiData.type){
                case 'postBone': 
                    text = `User ${notiData.userName} Have Boned Your Post`
                    break;
                case 'postComment':
                    text = `User ${notiData.userName} Have Commented Your Post`
                    break;
                case 'commentBone':
                    text = `User ${notiData.userName} Have Boned Your Comments`
                    break;
            }

            const notification = { 
                userId: notiData.id,
                text: text
            }

            const user = await User.findById(notiData.id);
            user.notifications.push(notification);
            await user.save();

        } catch(err){
            next({
                status: 500,
                message: 'failed to notify'
            })
        }
    }
};