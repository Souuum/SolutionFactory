import { LabeledTextField } from "src/core/components/LabeledTextField"
import React, { useState } from "react"

export const UserSignupForm = ({ onSelectChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value
    onSelectChange(selectedValue)
  }

  return (
    <div>
      <LabeledTextField
        className=" text-base  py-1 px-2 bg-transparent border-b border-b-cyan-700   border-solid appearance-none mt-3 mb-4"
        name="firstName"
        label="Prénom"
        placeholder="Prénom"
      />
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  border-solid appearance-none mt-3 mb-4"
        name="lastName"
        label="Nom"
        placeholder="Nom"
      />
      <label>
        Genre
        <select
          onChange={handleChange}
          name="gender"
          id="gender"
          className="block px-3 py-2 border-b border-cyan-700 bg-sky-100 rounded-md shadow-sm w-52 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">Choisir une option</option>
          <option value="WOMAN">Femme</option>
          <option value="MAN">Homme</option>
        </select>
      </label>

      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  border-solid appearance-none mt-3 mb-4"
        name="birthDate"
        label="Date de naissance"
        type="date"
      />
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700   border-solid appearance-none mt-3 mb-4"
        name="email"
        label="Email"
        placeholder="Email"
      />
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700   border-solid appearance-none mt-3 mb-4"
        name="phone"
        label="Numéro de téléphone"
        placeholder="0XXXXXXXXX"
        type="tel"
        pattern="[0-9]{10}"
      />
      <LabeledTextField
        className=" text-base py-1 px-2 bg-transparent border-b border-b-cyan-700  border-solid appearance-none mt-3 "
        name="password"
        label="Mot de passe"
        placeholder="Mot de passe"
        type="password"
      />
      <button type="submit" />
    </div>
  )
}
export default UserSignupForm
