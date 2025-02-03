module.exports = function(){
    this.inputValidations = function(film){
        const Joi = require('joi');
        const filmDataValidation = Joi.object({
            cim: Joi.string().min(1).max(50).required(),
            mufaj: Joi.string().min(1).max(50).required(),
            kategoria: Joi.string().min(1).max(50).required(),
            rendezo: Joi.string().min(1).max(50).required(),
        });
        return filmDataValidation.validate(film);
    };
}