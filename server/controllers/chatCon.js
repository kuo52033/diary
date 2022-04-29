import Chat from "../modules/chat.js";

export const createChat = async (req, res) => {
  const { member1, member2 } = req.body;

  try {
    const newChat = new Chat({ members: [member1, member2] });

    await newChat.save();

    return res.status(200).json(newChat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getChat = async (req, res) => {
  const { userId } = req.params;

  try {
    const allChat = await Chat.find({
      members: { $in: userId },
    }).populate({ path: "members", select: "name avatar" });

    return res.status(200).json(allChat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
