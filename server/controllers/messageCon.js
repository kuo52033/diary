import Message from "../modules/message.js";

export const createMessage = async (req, res) => {
  const { chatId, senderId, content } = req.body;

  try {
    const newMessage = new Message({ chatId, senderId, content });

    await newMessage.save();

    return res.status(200);
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

export const updateRead = async (req, res) => {
  const { chatId, userId } = req.params;
  try {
    await Message.updateMany(
      {
        $and: [{ chatId }, { senderId: userId }, { read: false }],
      },
      { $set: { read: true } }
    );

    return res.status(200).json({ message: "update success" });
  } catch (e) {
    res.status(404).json({ message: error.message });
  }
};

//test
export const d = async (req, res) => {
  try {
    await Message.deleteMany({});
    return res.status(200);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
