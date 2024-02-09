const Message = require('../models/messageModel');

exports.sendMessage = async function(req, res) {
  console.log(req.body);
  const { message,timestamp } = req.body;
  
  try {
    await Message.create({ message, timestamp });
    res.sendStatus(200);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).send('Error sending message');
  }
};


exports.getChatHistory = async function(req, res) {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching chat history:', err);
    res.status(500).send('Error fetching chat history');
  }
};


