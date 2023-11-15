import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { ClosedDate } from "@/entities/ClosedDate.ts";

async function handler(request, response) {
  if (request.method !== "PATCH") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { closedDates } = request.body;

  if (!closedDates?.length)
    return response
      .status(400)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    const closedDateRepository = connectToMySQL.getRepository(ClosedDate);

    const closedDatesEntity = new ClosedDate();
    closedDatesEntity.closedDates = closedDates;

    const existingEntry = await closedDateRepository.findOne({
      where: { id: 1 },
    });

    if (existingEntry) {
      await closedDateRepository.update(existingEntry.id, closedDatesEntity);
    } else {
      await closedDateRepository.save(closedDatesEntity);
    }

    return response.status(200).json({
      status: "success",
      message: "Closed Dates Updated Successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Update Closed Dates!",
    });
  }
}

export default handler;
