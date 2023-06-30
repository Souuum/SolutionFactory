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

  for (let i = 0; i < 100; i++) {
    // patients creation
    const gender = faker.person.sexType()
    const firstName = faker.person.firstName(gender)
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })
    const password = faker.internet.password({ length: 10 })
    const hashedPassword = await SecurePassword.hash(password.trim())
    const phone = faker.phone.number()
    const birthDate = faker.date.birthdate({ min: 18, mode: "age" })

    const usr = await db.user.create({
      data: {
        email: email,
        phone: phone,
        hashedPassword: hashedPassword,
        role: faker.helpers.arrayElement(["SUPERPATIENT", "MEDECIN", "PHARMACIST"]),
        lastName: lastName,
        firstName: firstName,
        gender: gender,
        birthDate: birthDate,
      },
    })

    if (usr.role === "SUPERPATIENT") {
      const groupe = await db.groupe.create({
        data: {
          name: "Groupe" + usr.id,
        },
      })

      const patient = await db.patient.create({
        data: {
          userId: usr.id,
          securityNumber: faker.string.numeric({ length: 13 }),
          groupeId: groupe.id,
        },
      })
    }

    if (usr.role === "MEDECIN") {
      const medecin = await db.medecin.create({
        data: {
          userId: usr.id,
          specialty: faker.helpers.arrayElement(["GENERALISTE", "CARDIOLOGUE", "PNEUMOLOGUE"]),
          rpps: faker.string.numeric({ length: 11 }),
          cabinet: faker.address.streetAddress(),
        },
      })
    }

    if (usr.role === "PHARMACIST") {
      const pharmacien = await db.pharmacien.create({
        data: {
          userId: usr.id,
          rpps: faker.string.numeric({ length: 11 }),
          pharmacy: faker.address.streetAddress(),
        },
      })
    }
  }
}
export default seed
