import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/bookings", auth(USER_ROLE.user), bookingController.createBooking);
router.put("/car/return", bookingController.returnBooking);
// router.put("/cars/return", bookingController.returnBooking);
router.get(
  "/bookings",
  auth(USER_ROLE.admin),
  bookingController.getAllBookingQuery
);
router.get("/bookings", bookingController.getAllBooking);
router.get(
  "/bookings/my-bookings",
  auth(USER_ROLE.user),
  bookingController.getBookingByUserId
);

export const bookingRoutes = router;
