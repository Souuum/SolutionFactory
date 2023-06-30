import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { SecurePassword } from "@blitzjs/auth/secure-password"
import { Role } from "types"
const Signup = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  password: z.string().min(10).max(20),
  role: z.enum(["PHARMACIST", "MEDECIN", "SUPERPATIENT"]),
  lastName: z.string().min(2).max(100),
  firstName: z.string().min(2).max(100),
  birthDate: z.date(),
  gender: z.enum(["MAN", "WOMAN"]),
})
export default resolver.pipe(
  resolver.zod(Signup),
  async ({ email, phone, password, role, lastName, firstName, birthDate, gender }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email,
        phone,
        hashedPassword,
        role,
        lastName,
        firstName,
        birthDate,
        gender,
      },
      select: {
        id: true,
        role: true,
      },
    })
    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
