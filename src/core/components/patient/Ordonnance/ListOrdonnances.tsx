import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import React, { Suspense, useEffect, useRef, useState } from "react"
import { useQuery } from "@blitzjs/rpc"
import getOrdonnances from "src/ordonnances/queries/getOrdonnancesByUser"
import CategoriesSelect from "./CategoriesSelect"
import DateCalendar from "./Calendar"
import AutocompleteText from "./Autocomplete"
const OrdonnanceComp: React.FC = () => {
  var [text, setText] = React.useState<any>("")
  const [selectedCategories, setSelectedCategories] = useState<any>([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRange, setSelectedRange] = useState([null, null])
  const [ordonnances] = useQuery(getOrdonnances, null)
  const calendarRef = useRef(null)

  const handleDateChange = (date, range) => {
    setSelectedDate(date)
    setSelectedRange(range)
    console.log(date, range)
  }

  const selectedText = (value) => {
    setText((text = value))
  }

  const onChangeText = () => {
    setText((text = null))
  }

  const sendResearch = () => {}

  return (
    <div className="flex flex-row">
      <div className="mr-5">
        <Suspense fallback="Loading...">
          <CategoriesSelect onCategoriesChange={setSelectedCategories} />
        </Suspense>
      </div>
      <div className="mr-24 static">
        <div ref={calendarRef}>
          <DateCalendar onDateChange={handleDateChange} />
        </div>
      </div>
      <div className="mr-24">
        <AutocompleteText
          items={ordonnances!.map((ordonnance: { name: string }) => ({
            name: ordonnance.medecin.user.lastName,
          }))}
          text={text}
          setText={setText}
          sendResearch={sendResearch}
          onChangeText={onChangeText}
          selectedText={selectedText}
        />
      </div>
    </div>
  )
}

const OrdonnanceResult = () => {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <OrdonnanceComp />
    </Suspense>
  )
}

export default OrdonnanceResult
