import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const adminProtect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No token provided, authorization denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await User.findById(decoded.id);

      if (!admin || !admin.isAdmin) {
        return res.status(403).json({ msg: "Admin access only" });
      }

      req.admin = admin;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }
};
