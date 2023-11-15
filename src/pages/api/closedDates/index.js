import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { ClosedDate } from "@/entities/ClosedDate.ts";

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

    const closedDatesRepository = connectToMySQL.getRepository(ClosedDate);
    const closedDates = await closedDatesRepository.find();

    return response.status(200).json({
      status: "success",
      message: "Success.",
      data: closedDates[0].closedDates,
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Fetch Closed Dates!",
    });
  }
}

export default handler;
