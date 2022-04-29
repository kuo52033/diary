import Message from "../modules/message.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, content } = req.body;

  try {
    const newMessage = new Message({ chatId, senderId, content });

    await newMessage.save();

    return res.status(200).json(newMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMessage = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId });

    return res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
