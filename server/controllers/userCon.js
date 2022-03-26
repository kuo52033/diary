import User from "../modules/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import postMessage from "../modules/postMessage.js";
import cloudinary from "cloudinary";

export const userSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select(
      "name avatar email password"
    );

    if (!existingUser)
      return res.status(404).json({ message: "帳號或密碼輸入錯誤" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(404).json({ message: "帳號或密碼輸入錯誤" });

    const accessToken = jwt.sign(
      { id: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "80m" }
    );

    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1w" }
    );
    await User.findByIdAndUpdate(existingUser._id, {
      $push: { refreshToken: refreshToken },
    });

    const { _id, name } = existingUser;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 31557600000,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 31557600000,
    });

    res.status(200).json({
      result: { _id, name, avatar: existingUser.thumbnail },
      message: "登入成功",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "電子郵件已使用過" });

    const hashedPaaword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPaaword,
    });

    const accessToken = jwt.sign(
      { id: result._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      { id: result._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1w" }
    );
    await User.findByIdAndUpdate(result._id, {
      $push: { refreshToken: refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 31557600000,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 31557600000,
    });

    const { _id } = result;

    res.status(200).json({ result: { _id, name }, message: "註冊成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  const { refreshToken = null } = req.cookies;
  const { myId } = req.params;
  try {
    if (!refreshToken) return res.status(200).json({ message: "已登出" });
    await User.findByIdAndUpdate(myId, {
      $pull: { refreshToken: refreshToken },
    });
    res.clearCookie("refreshToken", {
      secure: true,
      sameSite: "None",
    });
    res.clearCookie("accessToken", {
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "已登出" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.userId;
  try {
    if (oldPassword === newPassword)
      return res.status(400).json({ message: "不可與舊密碼相同" });

    const user = await User.findById(userId).select("password").lean();

    const passwordCheck = await bcrypt.compare(oldPassword, user.password);

    if (!passwordCheck)
      return res.status(400).json({ message: "密碼輸入錯誤" });

    const hashPassword = await bcrypt.hash(newPassword, 12);

    await User.findByIdAndUpdate(userId, { password: hashPassword });

    res.status(200).json({ message: "更換成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await User.findById(userId)
      .select("-refreshToken -password")
      .lean();

    res.status(200).json({
      ...userData,
      avatar: userData.avatar.url.replace("/upload", "/upload/w_200"),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPostLength = async (req, res) => {
  const { userId } = req.params;

  try {
    const postLength = await postMessage.countDocuments({ creator: userId });

    res.status(200).json(postLength);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserAvatar = async (req, res) => {
  const userId = req.userId;

  try {
    if (req.mimetypeError)
      return res.status(415).send({ message: req.mimetypeError });

    const userAvatar = await User.findById(userId);

    if (userAvatar.avatar.filename)
      await cloudinary.v2.uploader.destroy(userAvatar.avatar.filename);

    userAvatar.avatar = { url: req.file.path, filename: req.file.filename };
    await userAvatar.save();

    res.status(200).json({
      avatarurl: userAvatar.thumbnail,
      message: "更新成功",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.userId;
  const { updateData } = req.body;
  const { type } = req.params;

  try {
    if (type === "birthDate") {
      await User.findByIdAndUpdate(userId, { [type]: new Date(updateData) });
    } else {
      await User.findByIdAndUpdate(userId, { [type]: updateData });
    }
    res.status(200).json({ message: "更新成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const favoritePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    await User.findByIdAndUpdate(userId, {
      $push: { favorites: { $each: [id], $position: 0 } },
    });
    await postMessage.findByIdAndUpdate(id, {
      $push: { favorites: userId },
    });

    res.status(200).json({ message: "收藏成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const unfavoritePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: id },
    });
    await postMessage.findByIdAndUpdate(id, {
      $pull: { favorites: userId },
    });
    res.status(200).json({ message: "取消收藏成功" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
