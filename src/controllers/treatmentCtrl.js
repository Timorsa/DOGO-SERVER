const Treatment = require('../models/Treatment');

module.exports = {
  async createPost(req, res, next) {
    try {
      const treatment = await Treatment.create(req.body);
      res.status(200).json(event);
    } catch (err) {
      next({
        status: 500,
        message: 'couldn make event'
      });
    }
  },
  async findTreatments(req, res, next) {
    try {
      const teartments = await Treatment.find({ pet: { $in: req.body.petId } });
      res.status(200).json(treatments);
    } catch (err) {
      next({
        status: 500,
        message: 'cant find events'
      });
    }
  }
};
