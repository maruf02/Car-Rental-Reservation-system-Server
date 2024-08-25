import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";
import { AuthServices } from "./auth.service";

const transformUserResponse = (user: any, token: any) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { user, accessToken } = result;

  const response = transformUserResponse(
    user,
    accessToken.replace("Bearer ", "")
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: { response, token: accessToken },
  });
});
export const AuthControllers = {
  loginUser,
};
