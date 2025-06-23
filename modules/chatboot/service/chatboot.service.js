const axios = require("axios");

const getChatReply = async (input) => {
    const response = await axios.post("http://127.0.0.1:5000/generate", {
        text: input,
    });
    return response.data.response;
};

module.exports = { getChatReply };
