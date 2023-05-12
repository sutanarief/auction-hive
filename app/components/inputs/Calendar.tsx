'use client'

import { Range, RangeKeyDict, DateRange } from "react-date-range"
import { addDays } from "date-fns"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

type CalendarProps = {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[]

}

const Calendar:React.FC<CalendarProps> = ({
  onChange,
  value,
  disabledDates
}) => {

  const minDate = () => {
    const currentTime = new Date()
    const currentHour = currentTime.getHours()
    const currentMinute = currentTime.getMinutes()

    if (currentHour >= 10 && currentMinute >= 0) {
      return 1
    } else {
      return 0
    }
  }

  return (
    <div
      className="
        justify-center
        flex
      "
    >
      <DateRange
        rangeColors={['#262626']}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={addDays(new Date(), minDate())}
        disabledDates={disabledDates}
      />
    </div>
  );
}

export default Calendar;