import { LabeledTextField } from "src/core/components/LabeledTextField"
import React, { useState } from "react"

export const UserSignupForm = ({ onSelectChange }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value
    onSelectChange(selectedValue)
  }

  return (
    <div>
      <LabeledTextField name="firstName" label="Firstname" placeholder="Firstname" />
      <LabeledTextField name="lastName" label="Lastname" placeholder="Lastname" />
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
      <LabeledTextField name="birthDate" label="Birthdate" type="date" />
      <LabeledTextField name="email" label="Email" placeholder="Email" />
      <LabeledTextField
        name="phone"
        label="Phone number"
        placeholder="0XXXXXXXXX"
        type="tel"
        pattern="[0-9]{10}"
      />
      <LabeledTextField
        name="securityNumber"
        label="Security number"
        placeholder="XXXXXXXXXXXXX"
        pattern="[0-9]{13}"
      />
      <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      <button type="submit" />
    </div>
  )
}
export default UserSignupForm
