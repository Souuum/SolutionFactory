import { LabeledTextField } from "src/core/components/LabeledTextField"
import React, { useState } from "react"

export const UserSignupForm = ({ onSelectChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value
    onSelectChange(selectedValue)
  }

  return (
    <div>
      <LabeledTextField name="firstName" label="Prénom" placeholder="Prénom" />
      <LabeledTextField name="lastName" label="Nom" placeholder="Nom" />
      <label className="text-gray-700">
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
      <LabeledTextField name="birthDate" label="Date de naissance" type="date" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField
        name="phone"
        label="Numéro de téléphone"
        placeholder="0XXXXXXXXX"
        type="tel"
        pattern="[0-9]{10}"
      />
      <LabeledTextField
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
