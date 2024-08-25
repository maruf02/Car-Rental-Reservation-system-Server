import { error } from "console";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError";
import config from "../../config";
import jwt from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  console.log(payload); //body theke asa email r password
  const isUserExist = await UserModel.findOne({ email: payload?.email }).select(
    "+password"
  );
  // user er sob data pawa jabe
  // console.log(isUserExist);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found !");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "Password Not Matched");
  }
  const jwtPayload = {
    _id: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  const { password, ...userWithoutPassword } = isUserExist.toObject();

  return { user: userWithoutPassword, accessToken };
};

export const AuthServices = {
  loginUser,
};
