import bcryptjs from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (useValue) => {
  const salt = await bcryptjs.genSalt(10);
  const hashedpassword = await bcryptjs.hash(useValue, salt);
  return hashedpassword;
};

export const compareString = async (userPassword, password) => {
  const isMatch = await bcryptjs.compare(userPassword, password);
  return isMatch;
};
//3m,3h,3d
export function createJWT(Id) {
  return JWT.sign({ id: Id }, process.env.JWT_SECRET_KEY);
}
