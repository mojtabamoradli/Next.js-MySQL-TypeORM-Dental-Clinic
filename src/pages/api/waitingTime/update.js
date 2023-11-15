import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { WaitingTime } from "@/entities/WaitingTime.ts";
import { convertPersianNumbersToEnglish } from "@/functions/convertPersianNumbersToEnglish";

async function handler(request, response) {
  if (request.method !== "PATCH") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { waitingTime } = request.body;

  if (!waitingTime)
    return response
      .status(400)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    const waitingTimeRepository = connectToMySQL.getRepository(WaitingTime);

    const waitingTimeEntity = new WaitingTime();
    waitingTimeEntity.waitingTime = convertPersianNumbersToEnglish(waitingTime);

    await waitingTimeRepository.save(waitingTimeEntity);

    return response.status(200).json({
      status: "success",
      message: "Waiting Time Updated Successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Update Waiting Time!",
    });
  }
}

export default handler;
