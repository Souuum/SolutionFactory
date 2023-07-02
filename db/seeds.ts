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
  }

  for (let i = 1; i < 30; i++) {
    //Création de Médecin
    //Création du User lié au médecin
    const gender = faker.datatype.boolean() ? "male" : "female"
    const firstName = faker.person.firstName(gender)
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })

    const password = faker.internet.password()
    const hashedPassword = await SecurePassword.hash(password.trim())
    const phone = faker.phone.number()
    const birthDate = faker.date.between({ from: "1950-01-01", to: "2005-12-31" })
    const rpps = faker.datatype.number({ min: 10000000000, max: 99999999999 }).toString()

    const speciality = faker.lorem.word()
    const address = faker.location.streetAddress()

    const user = await db.user.create({
      data: {
        email: email,
        phone: phone,
        hashedPassword: hashedPassword,
        lastName: lastName,
        firstName: firstName,
        gender: gender,
        birthDate: birthDate,
        role: "MEDECIN",
      },
    })

    const medecin = await db.medecin.create({
      data: {
        userId: user.id,
        rpps: rpps,
        cabinet: address,
        specialty: speciality,
      },
    })

    console.log(medecin)

    //creation d'ordonnance

    const category =
      i % 1 == 0
        ? "delivrance"
        : i % 2 == 0
        ? "chronique"
        : i % 3 == 0
        ? "dispositif"
        : i % 4 == 0
        ? "examen"
        : "orthophonie"
    const eo = faker.datatype.number({ min: 60, max: 3000 })
    const expiration = faker.date.soon({ days: eo })
    const ep = faker.datatype.number({ min: 7, max: 21 })
    const expirationPre = faker.date.soon({ days: ep })

    const prescriptionDrug = faker.lorem.word()
    const prescriptionDesc = faker.lorem.lines({ min: 1, max: 2 })
    const patientId = faker.datatype.number({ min: 4, max: 100 })

    const ordonnance = await db.ordonnance.create({
      data: {
        createdBy: medecin.id,
        patientId: patientId,
        category: category,
        expiration: expiration,
      },
    })

    const prescription = await db.prescription.create({
      data: {
        ordonnanceId: ordonnance.id,
        drug: prescriptionDrug,
        description: prescriptionDesc,
        morning: 1,
        afternoon: 1,
        evening: 1,
        expirationTime: expirationPre,
      },
    })

    console.log(prescription)
  }
}

export default seed
