import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { WaitingTime } from "@/entities/WaitingTime.ts";

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

    const waitingTimeRepository = connectToMySQL.getRepository(WaitingTime);
    const waitingTime = await waitingTimeRepository.findOne({
      where: {
        id: 1,
      },
    });

    return response.status(200).json({
      status: "success",
      message: "Success.",
      data: waitingTime,
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Fetch Waiting Time!",
    });
  }
}

export default handler;
