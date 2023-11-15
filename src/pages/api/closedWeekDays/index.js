import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { ClosedWeekDay } from "@/entities/ClosedWeekDay.ts";

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

    const closedWeekDaysRepository =
      connectToMySQL.getRepository(ClosedWeekDay);
    const closedWeekDays = await closedWeekDaysRepository.find();

    return response.status(200).json({
      status: "success",
      message: "Success.",
      data: closedWeekDays[0].closedWeekDays,
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Fetch Closed Week Days!",
    });
  }
}

export default handler;
