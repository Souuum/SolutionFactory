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
    const securityNumber = faker.string.numeric({ length: 13 })
    const password = faker.internet.password({ length: 10 })
    const hashedPassword = await SecurePassword.hash(password.trim())
    const phone = faker.phone.number()
    const birthDate = faker.date.birthdate({ min: 18, mode: "age" })

    const usr = await db.user.create({
      data: {
        gender: gender,
        firstName: firstName,
        lastName: lastName,
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
        lastName: lastName,
        userId: usr.id,
        securityNumber: usr.securityNumber,
      },
    })
    //Ajout de patient secondaire tous les 3 ajouts
    if (i % 3 == 0) {
      let securityNumber2
      const birthDate2 = faker.date.birthdate({ max: 30, mode: "age" })
      if (birthDate2.getFullYear() < 2005) {
        //Si le nouveau patient est majeur, on créer un nouveau securityNumber
        securityNumber2 = faker.string.numeric({ length: 13 })

        console.log("membre créé pour le security number : " + securityNumber2)
      } else {
        securityNumber2 = usr.securityNumber

        console.log("enfant créé pour le security number : " + securityNumber2)
      }

      const gender = faker.person.sexType()
      const firstName = faker.person.firstName(gender)
      const lastName = faker.person.lastName()

      const patient2 = await db.patient.create({
        data: {
          gender: gender,
          firstName: firstName,
          lastName: lastName,
          userId: usr.id,
          securityNumber: securityNumber2,
        },
      })
    }
  }
}

export default seed
