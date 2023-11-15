import { DataSource } from "typeorm";
import { Appointment } from "@/entities/Appointment.ts";
import { OpenHour } from "@/entities/OpenHour.ts";
import { WaitingTime } from "@/entities/WaitingTime.ts";
import { ClosedWeekDay } from "@/entities/ClosedWeekDay.ts";
import { ClosedDate } from "@/entities/ClosedDate.ts";


let initialized = false;
const connectToMySQL = new DataSource({
  type: "mysql",
  host: process.env.NEXT_PUBLIC_MYSQL_HOST,
  port: parseInt(process.env.NEXT_PUBLIC_MYSQL_PORT, 10),
  username: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
  password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  database: process.env.NEXT_PUBLIC_MYSQL_DATABASE_NAME,
  synchronize: true,
  entities: [Appointment, OpenHour, WaitingTime, ClosedWeekDay, ClosedDate],
});

async function initializeDatabase() {
  if (!initialized) {
    await connectToMySQL.initialize();
    initialized = true;
  }
}

export { initializeDatabase, initialized, connectToMySQL };
