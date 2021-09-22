import jwt from "jsonwebtoken";
import User from "../modules/user.js";

export default async (req, res, next) => {
  // const token = req.headers.authorization.split(" ")[1];

  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken || !refreshToken)
    return res.status(404).json({ message: "使用者驗證錯誤" });
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        try {
          const { newAccessToken, id } = await refresh(refreshToken);
          req.userId = id;
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 31557600000,
          });
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
      } else {
        req.userId = user.id;
      }
      next();
    }
  );
};

const refresh = async (refreshToken) => {
  let newAccessToken;
  let refreshVerify;
  try {
    refreshVerify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new Error("請重新登入");
  }
  const refreshTokenExist = await User.findById(refreshVerify.id)
    .select({
      exist: { $in: [refreshToken, "$refreshToken"] },
    })
    .lean();

  if (!refreshTokenExist.exist) throw new Error("refreshToken未授權");

  newAccessToken = jwt.sign(
    { id: refreshVerify.id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );

  return { newAccessToken, id: refreshVerify.id };
};
