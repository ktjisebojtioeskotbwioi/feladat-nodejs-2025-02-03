module.exports = function(){
    this.filmValidation = function(film){
        const Joi = require('joi');
        const filmDataValidation = Joi.object({
            cim: Joi.string().min(1).max(50).required(),
            mufaj: Joi.string().min(1).max(50).required(),
            kategoria: Joi.string().min(1).max(50).required(),
            rendezo: Joi.string().min(1).max(50).required(),
        });
        return filmDataValidation.validate(film);
    };
    this.rendelesValidation = function(rendeles){
        const Joi = require('joi');
        const filmDataValidation = Joi.object({
            Vetites: Joi.number().required(),
            Nev: Joi.string().min(1).max(50).required(),
            uid: Joi.number().required(),
            Hely: Joi.string().min(1).max(50).required(),
            Statusz: Joi.string().required()
        });
        return filmDataValidation.validate(rendeles);
    };
    this.vetitesValidation = function(vetites){
        const Joi = require('joi');
        const filmDataValidation = Joi.object({
            Film: Joi.number().required(),
            Idopont: Joi.string().required(),
            Terem: Joi.number().required()
        });
        return filmDataValidation.validate(vetites);
    };
    this.teremValidation = function(terem){
        const Joi = require('joi');
        const filmDataValidation = Joi.object({
            Ferohely: Joi.number().required(),
            Tipus: Joi.string().min(1).max(50).required(),
            Sorok: Joi.number().required(),
            Allapot: Joi.string().min(1).max(50).required()
        });
        return filmDataValidation.validate(terem);
    };
    this.felhValidation = function(felh){
        const Joi = require('joi');
        const filmDataValidation = Joi.object({
            Fnev: Joi.string().min(1).max(20).required(),
            Jelszo: Joi.string().min(1).max(20).required(),
            Email: Joi.string().email().required(),
            Statusz: Joi.number().min(1).max(10)
        });
        return filmDataValidation.validate(felh);
    };
}