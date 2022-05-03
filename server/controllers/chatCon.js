import Chat from "../modules/chat.js";
import Message from "../modules/message.js";

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
    })
      .populate({ path: "members", select: "name avatar" })
      .lean();

    const lastestMessage = await Message.aggregate([
      {
        $match: {
          chatId: { $in: allChat.map((c) => c._id) },
        },
      },
      { $sort: { createdAt: 1 } },
      { $group: { _id: "$chatId", content: { $last: "$$ROOT" } } },
    ]);

    const combineChat = allChat.map((c) => {
      const lastM = lastestMessage.find((m) => m._id.equals(c._id));
      return {
        ...c,
        lastestMessage: lastM
          ? {
              content: lastM.content.content,
              createdAt: lastM.content.createdAt,
            }
          : null,
      };
    });

    combineChat.sort(function (a, b) {
      if (!b.lastestMessage || !a.lasetstMessage) return -1;
      return b.lastestMessage.createdAt - a.lasetstMessage.createdAt;
    });

    return res.status(200).json(combineChat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
