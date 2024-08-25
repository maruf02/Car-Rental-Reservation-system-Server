import { BookingModel } from "./booking.model";
import { TBooking } from "./booking.interface";
import { CarModel } from "../car/car.model";
import { error } from "console";
import moment from "moment";
import { calculateTotalCost } from "./convertTimeAndPriceCalcutaion";
import AppError from "../utils/AppError";
import { StatusCodes } from "http-status-codes";

type TReturnData = {
  bookingId: string;
  endTime: string;
};

const createBookingIntoDB = async (bookingData: TBooking) => {
  // const { car, user } = bookingData;
  const { car, user, date, startTime } = bookingData;
  const cars = await CarModel.findById(car);
  const carStatus = cars?.status;
  // console.log(carStatus);
  if (carStatus === "unavailable") {
    // console.log("already booked");
    throw new AppError(StatusCodes.FORBIDDEN, "already booked");
  }
  // const booking = await BookingModel.create(bookingData);
  const booking = await BookingModel.create({
    car,
    user,
    date,
    startTime,
  });

  await CarModel.updateOne({ _id: car }, { $set: { status: "unavailable" } });
  const populatedBooking = (
    await booking.populate("user", "-password -createdAt -updatedAt -__v")
  ).populate("car", "-__v");
  return populatedBooking;
};

const getAllBookingFromDB = async () => {
  const cars = await BookingModel.find();

  return cars;
};
const getAllBookingQueryFromDB = async (carId?: string, date?: string) => {
  let query: any = {};

  if (carId) {
    query.car = carId;
  }

  if (date) {
    query.date = date;
  }
  // console.log(query);
  // console.log(carId, date);
  const bookings = await BookingModel.find(query)
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");
  return bookings;
};
const getBookingByUserIdFromDB = async (userId: string) => {
  // const userId = "666b07c07e36eebd720beab5";
  const myBookings = await BookingModel.find({ user: userId })
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");
  return myBookings;
};

const returnBookingFromDB = async (bookingId: string, endTime: string) => {
  const bookingDetails = await BookingModel.findById(bookingId).populate("car");
  if (!bookingDetails) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }
  if (!bookingDetails) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }
  const { startTime, car } = bookingDetails;

  if (!car) {
    throw new AppError(StatusCodes.NOT_FOUND, "Car not found for the booking");
  }

  const { pricePerHour: price } = car as any;

  const totalCost = calculateTotalCost(startTime, endTime, price);

  const updatedBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    { $set: { endTime: endTime, totalCost: totalCost } },
    { new: true }
  )
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");

  await CarModel.updateOne({ _id: car._id }, { $set: { status: "available" } });
  return updatedBooking;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingByUserIdFromDB,
  getAllBookingQueryFromDB,
  returnBookingFromDB,
};
