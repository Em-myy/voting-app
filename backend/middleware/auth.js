import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token provided, authorization denied" });
  }
};
