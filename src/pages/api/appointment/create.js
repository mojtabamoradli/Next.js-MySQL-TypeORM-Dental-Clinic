import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { Appointment } from "@/entities/Appointment.ts";
import { OpenHour } from "@/entities/OpenHour.ts";

async function handler(request, response) {
  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { firstName, lastName, mobileNumber, date } = request.body;

  if (!firstName || !lastName || !mobileNumber || !date)
    return response
      .status(402)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    // ↓↓ Don't create if in closed hours ↓↓
    const openHourRepository = connectToMySQL.getRepository(OpenHour);

    const openHours = await openHourRepository.find();

    const dayOfWeek = new Date(date * 1000).getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]; // order matters
    const dayName = daysOfWeek[dayOfWeek];
    const dayOpenHours = openHours?.find((day) => day.dayOfWeek === dayName);

    const selectedDate = new Date(+date * 1000);
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();

    const isTimeInRange = (start, end) => {
      if (start === 0 && end === 0) {
        return false;
      }

      const convertTimestampToHoursAndMinutes = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return hours * 60 + minutes;
      };

      const startTime =
        start === 0 ? 0 : convertTimestampToHoursAndMinutes(start);
      const endTime =
        end === 0 ? 24 * 60 : convertTimestampToHoursAndMinutes(end);

      const selectedTime = hours * 60 + minutes;

      return selectedTime >= startTime && selectedTime <= endTime;
    };

    if (
      !isTimeInRange(dayOpenHours.startAM, dayOpenHours.endAM) &&
      !isTimeInRange(dayOpenHours.startPM, dayOpenHours.endPM)
    ) {
      return response.status(500).json({
        status: "failed",
        message: "Chosen Time is in Closed Hours!",
        code: 2,
      });
    }

    // ↑↑ Don't create if in closed hours ↑↑

    const appointmentRepository = connectToMySQL.getRepository(Appointment);

    // ↓↓ Don't create if hours reserved ↓↓

    const appointments = await appointmentRepository.find();

    const appointmentsDates = appointments.map((i) => +i.date);

    if (appointmentsDates && appointmentsDates.length) {
      const isDateAvailable = appointmentsDates?.every((timestamp) => {
        const twentyMinutesBefore = new Date(
          timestamp - (20 - 1) * 60
        ).getTime();
        const twentyMinutesAfter = new Date(
          timestamp + (20 - 1) * 60
        ).getTime();
        return date <= twentyMinutesBefore || date >= twentyMinutesAfter;
      });

      if (!isDateAvailable) {
        return response.status(500).json({
          status: "failed",
          message: "Chosen Time is Already Reserved!",
          code: 1,
        });
      }
    }

    // ↑↑ Don't create if hours reserved ↑↑

    const appointment = new Appointment();
    appointment.firstName = firstName;
    appointment.lastName = lastName;
    appointment.mobileNumber = mobileNumber;
    appointment.date = date;
    appointment.createdAt = `${Date.now()}`;

    await appointmentRepository.save(appointment);

    return response.status(200).json({
      status: "success",
      message: "Appointment Created Successfully.",
    });
  } catch (error) {
    return response.status(500).json({
      status: "failed",
      message: "Failed to Create Appointment!",
    });
  }
}

export default handler;
