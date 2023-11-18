import { hash } from "bcryptjs";
import { convertPersianNumbersToEnglish } from "@/functions/convertPersianNumbersToEnglish";
import {
  initializeDatabase,
  initialized,
  connectToMySQL,
} from "@/databases/connectToMySQL";
import { User } from "@/entities/User.ts";

async function handler(request, response) {
  if (request.method !== "POST") {
    return response
      .status(405)
      .json({ status: "failed", message: "Method Not Allowed!" });
  }

  const { fullName, mobileNumber, password } = request.body;

  if (!fullName || !mobileNumber || !password)
    return response
      .status(401)
      .json({ status: "failed", message: "Missing Required Data!" });

  try {
    if (!initialized) {
      await initializeDatabase();
    }

    if (
      password.length >= 8 &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/.test(
        convertPersianNumbersToEnglish(password)
      ) &&
      /09[0-3][0-9]-?[0-9]{3}-?[0-9]{4}/.test(
        convertPersianNumbersToEnglish(mobileNumber)
      )
    ) {
      const UserRepository = connectToMySQL.getRepository(User);

      const user = await UserRepository.findOne({
        where: { mobileNumber: convertPersianNumbersToEnglish(mobileNumber) },
      });

      if (!user) {
        const user = new User();
        user.fullName = fullName;
        user.password = await hash(
          convertPersianNumbersToEnglish(password),
          12
        );
        user.mobileNumber = mobileNumber;
        user.createdAt = Date.now();

        await UserRepository.save(user);

        response.status(200).json({
          status: "success",
          message: "User Created Successfully.",
        });
      } else {
        return response
          .status(401)
          .json({ status: "failed", message: "Failed to Fetch Data!" });
      }
    } else {
      return response
        .status(401)
        .json({ status: "failed", message: "Failed to Fetch Data!"});
    }
  } catch (error) {
    return response
      .status(401)
      .json({ status: "failed", message: "Failed to Fetch Data!"+error });
  }
}
export default handler;
