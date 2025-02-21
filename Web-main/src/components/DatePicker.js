// flowbite-datepicker는 제한이 많아서 react-datepicker 사용
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 한국어 설정
import { ko } from "date-fns/locale";

function DatePickerComponent({ label, selectedDate, handleDateChange }) {
  const today = new Date();

  return (
    <div>
      <label className="mr-1">{label}</label>
      <DatePicker
        locale={ko}
        selected={selectedDate}
        minDate={today}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd HH:mm"
        // 시간 선택
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="시간" 
      />
    </div>
  );
}

export default DatePickerComponent;
