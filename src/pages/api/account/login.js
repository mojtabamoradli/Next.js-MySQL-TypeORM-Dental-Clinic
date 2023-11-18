import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { serialize } from "cookie";
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

  const { mobileNumber, password } = request.body;

  if (!mobileNumber || !password)
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
      )
    ) {
        const UserRepository = connectToMySQL.getRepository(User);

        const user = await UserRepository.findOne({ where: { mobileNumber: convertPersianNumbersToEnglish(mobileNumber) } });

        if (!user)
          return response
            .status(401)
            .json({ status: "failed", message: "Failed to Fetch Data!" });

        const correctPassword = await compare(
          convertPersianNumbersToEnglish(password),
          user.password
        );

        if (!correctPassword)
          return response
            .status(401)
            .json({ status: "failed", message: "Unauthorized!" });

        const AuthToken = sign(
          { mobileNumber: user.mobileNumber, fullName: user.fullName },
          process.env.JWT_SECRET_KEY,
          { expiresIn: 24 * 60 * 60 }
        );

        response
          .status(200)
          .setHeader("Set-Cookie", [
            serialize("AuthToken", AuthToken, {
              httpOnly: true,
              maxAge: 24 * 60 * 60,
              path: "/",
            }),
          ])
          .json({
            status: "success",
            message: "Authorized.",
          });
      
    } else {
      return response
        .status(401)
        .json({ status: "failed", message: "Failed to Fetch Data!" });
    }
  } catch (error) {
    return response
      .status(401)
      .json({ status: "failed", message: "Failed to Fetch Data!" +error});
  }
}

export default handler;
