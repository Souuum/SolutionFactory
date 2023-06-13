import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { Signup } from "../schemas"

export default resolver.pipe(
  resolver.zod(Signup),
  async (
    { email, password, securityNumber, phone, role, lastname, firstName, gender, birthDate },
    ctx
  ) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        phone,
        securityNumber,
        hashedPassword,
        role,
        lastname,
        firstName,
        gender,
        birthDate,
      },
      select: { id: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
