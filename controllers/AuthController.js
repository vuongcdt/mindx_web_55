const crypto = require("crypto");
const jwt =require("jsonwebtoken")
const { findByUserName, insertUser } = require("../database/user");

const login = async (username, password) => {
  //step1: user da ton tai chua
  const existedUser = await findByUserName(username);
  if (!existedUser) {
    throw new Error("Username is not existed");
  }

  //step2: verify password kiem tra password
  if(!verifyPassword(password, existedUser)){
      throw new Error("Password not correct")
  }
  //step 3 token JWT
  const token = jwt.sign({ userId: existedUser._id}, "MY_PRIVATE_KEY", {
      expiresIn: 60 * 60,
  })

  return {user: existedUser,token: token}
};

const register = async (username, email, password) => {
  // * sptep1: kiem tra username da ton tai chua
  const existedUser = await findByUserName(username);
  if (existedUser) {
    throw new Error("Username is existed!");
  }
  // * step2: ma hoa mat khau user nhap vao
  const { salt, hashedPassword } = encryptPassword(password);

  // * step3: luu tru user vao database
  const insertedUser = await insertUser({
    username: username,
    email: email,
    salt: salt,
    hashedPassword: hashedPassword,
  });
  console.log('insertedUser:',insertedUser);
  return insertedUser;
};

const encryptPassword = (password) => {
  // private key for single user ma cho moi user
  const salt = crypto.randomBytes(128).toString("hex");

  // hashed password mat khau da ma hoa
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hashedPassword: hashedPassword,
  };
};

const verifyPassword = (password, user) => {
  const hashedPassword = crypto.pbkdf2Sync(
    password,
    user.salt,
    10000,
    64,
    "sha512"
  ).toString('hex');

  return hashedPassword === user.hashedPassword
};

module.exports = { login, register };
