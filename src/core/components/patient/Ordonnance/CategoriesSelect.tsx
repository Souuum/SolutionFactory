import React, { useState, useEffect } from "react"
import Select from "react-select"

export const CategoriesSelect = ({ onSelectChange }) => {
  const categories = [
    { value: "delivrance", label: "Délivrance de médicaments" },
    { value: "chronique", label: "maladie chronique" },
    { value: "dispositif", label: "Dispositif médical" },
    { value: "examen", label: "Prescription d'examen médical" },
    { value: "orthophonie", label: "Orthophonie" },
  ]
  const handleSelectChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value)
    onSelectChange(selectedValues)
  }

  const options = categories.map((item) => ({
    value: item.value,
    label: item.label,
  }))

  return (
    <Select
      options={options}
      isMulti
      onChange={handleSelectChange}
      placeholder="Categories"
      className="border-orange border w-295  text-sm  rounded-5"
    />
  )
}

export default CategoriesSelect
