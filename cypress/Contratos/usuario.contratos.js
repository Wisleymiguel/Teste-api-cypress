const Joi = require('joi');


const usuarioSchema = Joi.object({
 usuarios: Joi.array().items({
    nome: Joi.string(), 
    email: Joi.string(), 
    password: Joi.string(), 
    administrador: Joi.boolean(), 
    _id: Joi.string().optional() 
 }),
 quantidade: Joi.number()
});

export default usuarioSchema;
