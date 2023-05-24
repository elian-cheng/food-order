const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_REFRESH_SECRET_KEY } = require("../../common/config");
const { AUTHORIZATION_ERROR } = require("../../errors/appErrors");

const ALLOWED_PATHS = [
  "/signin",
  "/signup",
  "/",
  "/practice",
  "/lessons",
  "/quiz",
  "/missing-type",
  "/games",
  "/games/quiz",
  "/games/missing-type"
];
const USERS_PATH = "/users";
const LESSONS_PATH = /^\/lessons.*$/;
const QUIZ_PATH = /^\/quiz.*$/;
const MISSING_TYPE_PATH = /^\/missing-type.*$/;

function isOpenPath(path) {
  return (
    ALLOWED_PATHS.includes(path) ||
    LESSONS_PATH.test(path) ||
    QUIZ_PATH.test(path) ||
    MISSING_TYPE_PATH.test(path)
  );
}

const checkAuthentication = (req, res, next) => {
  if (isOpenPath(req.path)) {
    return next();
  }

  if (req.path === USERS_PATH && req.method === "POST") {
    return next();
  }

  const rawToken = req.headers.authorization;
  if (!rawToken) {
    throw new AUTHORIZATION_ERROR();
  }

  try {
    const token = rawToken.slice(7, rawToken.length);
    const secret = req.path.includes("tokens") ? JWT_REFRESH_SECRET_KEY : JWT_SECRET_KEY;
    const { id, tokenId } = jwt.verify(token, secret);
    req.userId = id;
    req.tokenId = tokenId;
  } catch (error) {
    throw new AUTHORIZATION_ERROR();
  }

  next();
};

module.exports = checkAuthentication;

