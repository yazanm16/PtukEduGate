const {getChatReply} = require("../service/chatboot.service");

const getChatResponse = async (req, res) => {
    try {
        const { input } = req.body;
       const reply=await getChatReply(input);
       if(!reply){
           return res.status(404).json({
               success: false,
               message:'No Reply found.'
           })
       }
       return res.status(200).send(reply);
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Model API error" });
    }
};

module.exports = { getChatResponse };