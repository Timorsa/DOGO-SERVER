const Pet = require('../models/Pet');
const { addPet, delPet } = require('../handlers/user');


module.exports = { 
    async create(req, res, next){
        try {
            const pet = await Pet.create(req.body);
            req.body.petId = pet._id;
            await addPet(req, res, next);
            res.status(200).json(pet);
        }catch(err){
            next({
                status:500,
                message: 'couldnt create pet'
            })
        }
    },
    async findPet(req, res, next){
        try {
            const pet = await Pet.findById(req.body.id);
            res.status(200).json(pet);
        }catch(err){
            next({
                status: 500,
                message: 'no such a pet'
            })
        }
    },
    async findPets(req, res, next){
        try{
            const pets = await Pet.find( { _id: { $in: req.body.pets } } );
            res.status(200).json(pets);
        }catch(err){
            next({
                status: 500,
                message: 'couldn find pets'
            })
        }
    }, 
    async updatePicture(req, res, next){
        try {
            const updatedPet = await Pet.updateOne(
              { _id: req.body.id },
              { $set: { picture: req.body.picture } }
            );
            res.status(200).json(updatedPet);
          } catch (err) {
            next({
              status: 500,
              message: 'couldnt update picture'
            });}
    },
    async updateBreed(req, res, next){
        try {
            const updatedPet = await Pet.updateOne(
              { _id: req.body.id },
              { $set: { breed: req.body.breed } }
            );
            res.status(200).json(updatedPet);
          } catch (err) {
            next({
              status: 500,
              message: 'couldnt update breed'
            });}
    },
    async updateAge(req, res, next){
        try {
            const updatedPet = await Pet.updateOne(
              { _id: req.body.id },
              { $set: { age: req.body.age } }
            );
            res.status(200).json(updatedPet);
          } catch (err) {
            next({
              status: 500,
              message: 'couldnt update age'
            });}
    },
    async updateWeight(req, res, next){
        try {
            const updatedPet = await Pet.updateOne(
              { _id: req.body.id },
              { $set: { weight: req.body.weight } }
            );
            res.status(200).json(updatedPet);
          } catch (err) {
            next({
              status: 500,
              message: 'couldnt update weight'
            });}
    },
    async updateSize(req, res, next){
        try {
            const updatedPet = await Pet.updateOne(
              { _id: req.body.id },
              { $set: { size: req.body.size } }
            );
            res.status(200).json(updatedPet);
          } catch (err) {
            next({
              status: 500,
              message: 'couldnt update size'
            });}
    },
    async delete(req, res, next){
        try {
            const pet =  await Pet.deleteOne(
                {_id: req.body.id},
                { owner: req.body.owner}
            );
            await delPet(req, res, next);
            res.status(200).json(pet);
        }catch(err){
            next({
                status: 500,
                message: 'couldnt delete pet'
            });
        }
    }
}