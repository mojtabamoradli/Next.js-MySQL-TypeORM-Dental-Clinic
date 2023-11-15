import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { Appointment } from "@/entities/Appointment.ts";

async function handler(request, response) {
  if (request.method !== "DELETE") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { id } = request.query;

  if (!id)
    return response
      .status(400)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }
    const appointmentRepository = connectToMySQL.getRepository(Appointment);

    const appointmentToDelete = await appointmentRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!appointmentToDelete) {
      return response.status(404).json({
        status: "failed",
        message: "Appointment not found!",
      });
    }

    await appointmentRepository.remove(appointmentToDelete);

    return response.status(200).json({
      status: "success",
      message: "Appointment Deleted Successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Create Appointment!",
    });
  }
}

export default handler;
