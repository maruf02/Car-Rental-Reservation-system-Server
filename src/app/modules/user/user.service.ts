import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  // const populateUser = await result.populate("user", "-password");
  // return populateUser;
  const userWithoutPassword = await UserModel.findById(result._id).select(
    "-password"
  );
  return userWithoutPassword;
  // return result;
};

export const userServices = {
  createUserIntoDB,
};
