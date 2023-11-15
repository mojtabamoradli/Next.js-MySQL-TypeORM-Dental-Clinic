import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { OpenHour } from "@/entities/OpenHour.ts";

async function handler(request, response) {
  if (request.method !== "PATCH") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { openHours } = request.body;

  if (!openHours)
    return response
      .status(400)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    const openHourRepository = connectToMySQL.getRepository(OpenHour);

    for (const entry of openHours) {
      const existingEntry = await openHourRepository.findOne({
        where: { dayOfWeek: entry.dayOfWeek },
      });

      if (existingEntry) {
        await openHourRepository.update(existingEntry.id, entry);
      } else {
        await openHourRepository.save(entry);
      }
    }

    return response.status(200).json({
      status: "success",
      message: "Open Hours Updated Successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Update Open Hours!",
    });
  }
}

export default handler;
