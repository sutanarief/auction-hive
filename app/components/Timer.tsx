'use client'
import Countdown from 'react-countdown';

type TimerProps = {
  isActive: boolean;
  endDate: string;
  startDate: string;
}

const Timer:React.FC<TimerProps> = ({
  isActive,
  endDate,
  startDate
}) => {

  const renderer = ({ days, hours, minutes, seconds, completed }:any ) => {
    const timeChecker = (value: any) => {
      return value < 10 ? `0${value}`: value
    }

    if (completed) {
      return null
    } else {
      return <span>{isActive ? 'Ends in - ': 'Starts in -'} {timeChecker(days)}:{timeChecker(hours)}:{timeChecker(minutes)}:{timeChecker(seconds)}</span>
    }
  }

  const addDate = (date: string, type: string) => {
    let result = new Date(date)

    if (type === 'start') {
      result.setHours(result.getHours() + 10)
    } else {
      result.setHours(result.getHours() - 14)
    }

    return result
  }

  return (
    <Countdown
      date={addDate(isActive ? endDate : startDate, isActive ? "end" : "start")}
      renderer={renderer}/>
  );
}
 
export default Timer;