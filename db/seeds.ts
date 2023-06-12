import db from "./index"
import { fakerFR as faker } from "@faker-js/faker"
import { SecurePassword } from "@blitzjs/auth/secure-password"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }

  for (let i = 0; i < 30; i++) {
    // patients creation
    const gender = faker.person.sexType()
    const firstName = faker.person.firstName(gender)
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })
    const securityNumber = faker.string.numeric({ length: 13 })
    const password = faker.internet.password({ length: 10 })
    const hashedPassword = await SecurePassword.hash(password.trim())
    const phone = faker.phone.number()
    const birthDate = faker.date.birthdate({ min: 18, mode: "age" })

    const usr = await db.user.create({
      data: {
        gender: gender,
        firstName: firstName,
        name: lastName,
        email: email,
        securityNumber: securityNumber,
        hashedPassword: hashedPassword,
        phone: phone,
        birthDate: birthDate,
      },
    })

    const patient = await db.patient.create({
      data: {
        gender: gender,
        firstName: firstName,
        name: lastName,
        userId: usr.id,
      },
    })

    console.log(patient)
  }
}

export default seed
