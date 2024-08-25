import { Request, Response } from "express";
import { userValidationSchema } from "./user.validation";
import { userServices } from "./user.service";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  // const user = req.body;
  // const result = await userServices.createUserIntoDB(user);
  // const populateUser = await result.populate("user", "-password");
  const user = req.body;
  const zodParseDataUser = userValidationSchema.parse(user);
  const result = await userServices.createUserIntoDB(zodParseDataUser);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

export const userController = {
  createUser,
};
