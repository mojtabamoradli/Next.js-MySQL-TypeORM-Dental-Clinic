import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { Appointment } from "@/entities/Appointment.ts";
import { Between, ILike } from "typeorm";

async function handler(request, response) {
  if (request.method !== "GET") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  let { currentPage, itemsPerPage, searchedText, from, until } = request.query;

  try {
    if (!initialized) {
      await initializeDatabase();
    }
    const appointmentRepository = connectToMySQL.getRepository(Appointment);

    const appointments = await appointmentRepository.find();

    const searchedAppointments = searchedText
      ? appointments.filter(
          (item) =>
            item.firstName.includes(searchedText) ||
            item.lastName.includes(searchedText) ||
            item.mobileNumber.includes(searchedText)
        )
      : appointments;
    const rangedAppointments =
      from 
        ? searchedAppointments.filter(
            (item) => item.date >= from && item.date <= until
          )
        : searchedAppointments;

    rangedAppointments.sort((a, b) => b.date - a.date);

    const totalPages = Math.ceil(rangedAppointments.length / itemsPerPage);

    return response.status(200).json({
      status: "success",
      message: "Success.",
      data: rangedAppointments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
      currentPage,
      itemsPerPage,
      total: rangedAppointments.length,
      totalPages,
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Fetch Appointments!" + error,
    });
  }
}

export default handler;
