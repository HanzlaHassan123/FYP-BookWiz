const joi=require('joi')

const userSchema=joi.object({
    user: joi.object({
        username:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required()
    }).required()
  
})

const notesSchema=joi.object({

    
        title:joi.string().required(),
        description:joi.string().required(),
        tag:joi.string(),
        date:joi.date()
    
})

module.exports={userSchema,notesSchema}
//module.exports={userSchema}