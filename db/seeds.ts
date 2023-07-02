import db from "./index"
import { faker } from "@faker-js/faker"
import { SecurePassword } from "@blitzjs/auth/secure-password"

const seed = async () => {
  for (let i = 1; i < 101; i++) {
    const gender = faker.datatype.boolean() ? "male" : "female"
    const firstName = faker.person.firstName(gender)
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })
    const securityNumber = faker.datatype
      .number({ min: 1000000000000, max: 9999999999999 })
      .toString()
    const password = faker.internet.password()
    const hashedPassword = await SecurePassword.hash(password.trim())
    const phone = faker.phone.number()
    const birthDate = faker.date.between({ from: "1950-01-01", to: "2005-12-31" })

    const user = await db.user.create({
      data: {
        email: email,
        phone: phone,
        hashedPassword: hashedPassword,
        lastName: lastName,
        firstName: firstName,
        gender: gender,
        birthDate: birthDate,
        role: "SUPERPATIENT",
      },
    })

    const groupe = await db.groupe.create({
      data: {
        name: "Groupe" + i,
      },
    })

    const patient = await db.patient.create({
      data: {
        userId: user.id,
        groupeId: faker.datatype.number({ min: 1, max: i, precision: 1 }),
        securityNumber: securityNumber,
      },
    })

    await db.patient.update({
      where: { id: patient.id },
      data: {
        groupe: {
          connect: { id: groupe.id },
        },
      },
    })

    for (let j = 0; j < 5; j++) {
      const medecin = await db.medecin.findFirst()

      const ordonnance = await db.ordonnance.create({
        data: {
          patient: {
            connect: { id: patient.id },
          },
          medecin: {
            connect: { id: medecin?.id },
          },
        },
      })

      for (let k = 0; k < 3; k++) {
        const drug = faker.random.word()
        const description = faker.lorem.sentence()

        await db.prescription.create({
          data: {
            ordonnance: {
              connect: { id: ordonnance.id },
            },
            drug: drug,
            description: description,
          },
        })
      }
    }
  }
}

export default seed
