const knex = require('knex');
const knexConfig = require('../../../knexfile');
const db = knex(knexConfig);

const sendContactMessage=async ({name, email, message, phone})=>{
   const[insertedId]= await db('contact_messages').insert({
        name,
        email,
        phone,
        message
    });
    return insertedId;
}
const listMessage=async ()=>{
return await db('contact_messages').orderBy('created_at','desc').select('*');
}
module.exports={
    sendContactMessage,
    listMessage
}