import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { OpenHour } from "@/entities/OpenHour.ts";

async function handler(request, response) {
  if (request.method !== "GET") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    const openHoursRepository = connectToMySQL.getRepository(OpenHour);
    const openHours = await openHoursRepository.find();

    return response.status(200).json({
      status: "success",
      message: "Success.",
      data: openHours,
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Fetch OpenHours!",
    });
  }
}

export default handler;
