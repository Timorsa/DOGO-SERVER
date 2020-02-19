const User = require('../models/User');


module.exports = {
    async unFollow(req, res, next){
        try {
            const user = await User.findById(req.body.followId);
            user.followers.pull(req.body.id);
            await user.save();
        }catch(err){
            next({
                status: 500,
                message: 'couldnt un-follow user'
             })
        }
    },
    async addPet(req, res, next){
        try{
            const user = await User.findById(req.body.owner);
            user.pets.push(req.body.petId);
            await user.save();
        }catch(err){
            next({
                status:500,
                message: 'couldnt add apet to user'
            })
        }
    },
    async delPet(req, res, next){
        try{
            const user = await User.findById(req.body.owner);
            user.pets.pull(req.body.id);
            await user.save();
        }catch(err){
            next({
                status:500,
                message: 'couldnt del apet from user'
            })
        }
    }
}