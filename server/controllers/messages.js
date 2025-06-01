const { Message } = require("../model/messages");

exports.saveMessage = async (req, res) => {
  try {
    const data = req.body;
    console.log({ data });

    const newMessage = new Message({
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
    });

    await newMessage.save();
    console.log("Message saved successfully:", newMessage);
    res.json("Message saved successfully");
  } catch (err) {
    console.error("Error saving message:", err.message);
    res.json({ err: err });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    console.log(sender, receiver);

    const messages = await Message.find({
      $or: [
        { sender: sender, receiver: receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    console.log("Messages:", messages);
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err.message);
    res.json("error while getting messages");
  }
};
