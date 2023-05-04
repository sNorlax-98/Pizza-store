const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    { username: user.username, id: user._id },
    "importantjwtsecret"
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    return res.json({ error: "User not authenticated" });
  }
  try {
    const validToken = verify(accessToken, "importantjwtsecret");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.json({ error });
  }
};
module.exports = { createTokens, validateToken };
