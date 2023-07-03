import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const DateCalendar = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRange, setSelectedRange] = useState([null, null])
  const [showCalendar, setShowCalendar] = useState(false)

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setSelectedRange([null, null])
    onDateChange(date, [null, null])
    setShowCalendar(false)
  }

  const handleRangeChange = (range) => {
    setSelectedRange(range)
    setSelectedDate(null)
    onDateChange(null, range)
    setShowCalendar(false)
  }

  const handleClearSelection = () => {
    setSelectedDate(null)
    setSelectedRange([null, null])
    onDateChange(null, null)
    setShowCalendar(false)
  }

  const handleCloseCalendar = () => {
    setShowCalendar(false)
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          className="border-orange border w-295  text-sm  rounded-5"
          type="text"
          value={
            selectedDate
              ? selectedDate.toDateString()
              : selectedRange[0] && selectedRange[1]
              ? `${selectedRange[0].toDateString()} - ${selectedRange[1].toDateString()}`
              : ""
          }
          onClick={() => setShowCalendar(true)}
          readOnly
        />
        {selectedDate || selectedRange[0] ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="ml-2 cursor-pointer"
            onClick={handleClearSelection}
          />
        ) : null}
        {showCalendar && (
          <FontAwesomeIcon
            icon={faTimes}
            className="ml-2 cursor-pointer"
            onClick={handleCloseCalendar}
          />
        )}
      </div>
      {showCalendar && (
        <div>
          <Calendar
            selectRange={true}
            value={selectedDate || selectedRange}
            onChange={selectedDate ? handleDateChange : handleRangeChange}
          />
        </div>
      )}
    </div>
  )
}

export default DateCalendar
