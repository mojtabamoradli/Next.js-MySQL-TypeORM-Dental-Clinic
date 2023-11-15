import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { ClosedWeekDay } from "@/entities/ClosedWeekDay.ts";

async function handler(request, response) {
  if (request.method !== "PATCH") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { closedWeekDays } = request.body;

  if (!closedWeekDays?.length)
    return response
      .status(400)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    const closedWeekDayRepository = connectToMySQL.getRepository(ClosedWeekDay);

    const closedWeekDaysEntity = new ClosedWeekDay();
    closedWeekDaysEntity.closedWeekDays = closedWeekDays;

    const existingEntry = await closedWeekDayRepository.findOne({
      where: { id: 1 },
    });

    if (existingEntry) {
      await closedWeekDayRepository.update(
        existingEntry.id,
        closedWeekDaysEntity
      );
    } else {
      await closedWeekDayRepository.save(closedWeekDaysEntity);
    }

    return response.status(200).json({
      status: "success",
      message: "Closed Week Days Updated Successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Update Closed Week Days!"+error,
    });
  }
}

export default handler;
