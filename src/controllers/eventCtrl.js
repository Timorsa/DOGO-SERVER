const Event = require('../models/Event');

module.exports = {
    async createEvent(req, res, next){
        try{
            const event = await Event.create(req.body);
            res.status(200).json(event);
        }catch(err){
            next({
                status:500,
                message: 'couldn make event'
            })
        }
    },
    async eventsByUsers(req, res, next) {
        try {
          const events = await Event.find({ owner: { $in: req.body.users } });
          res.status(200).json(events);
        } catch (err) {
          next({
            status: 500,
            message: 'cant find events'
          });
        }
      },
    async eventsByUser(req, res, next){
        try{
            const events = await Event.find({ owner: req.body.user  });
            res.status(200).json(events);
        }catch(err){
            next({
                status: 500,
                message: 'couldnt make event'
            })
        }
    },
    async findEventByName(req, res, next) {
        try {
          const events = await Event.find({ name: req.body.name });
          res.status(200).json(events);
        } catch (err) {
          next({
            status: 500,
            message: 'cant find events'
          });
        }
    },
    // not working
    async interested (req, res, next) {
      try { 
        const event = await Event.updateOne(
          {_id: req.body.id},
          {$push: {interested: req.body.user }});
          res.status(200).json(event);
      }catch(err){
        next({
          status: 500,
          message: 'couldnt register to event'
        })
      }
    },
    async registerReq(req, res, next){
      try{
        const event = await Event.updateOne(
          {_id: req.body.id},
          {$push: {going: req.body.user }});
        res.status(200).json(event);
      }catch(err){
        next({
          status: 500,
          message: 'couldnt register to event'
        })
      }
    },
    async getReq (req, res, next){
      try{
        const event = await Event.findById(body.req.id);
        event.going.populate('userId');
        const unApproved = event.going.filter((go) => go.approved === false )
        res.status(200).json(unApproved);
      }catch(err){
        next({
          status: 500,
          message: 'couldnt get requests'
        })
      }
    },
    // async approvReq (req, res, next){
    //   try{
    //     const event = await (await Event.findById(req.body.id)).populated('owner');
        
    //   }catch(err){
    //     next({
    //       status: 500,
    //       message: 'couldnt approv request'
    //     })
    //   }
    // }

}