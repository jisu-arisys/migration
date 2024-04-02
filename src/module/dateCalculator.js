// import dayjs from "dayjs";
import 'dayjs/locale/ko';

export default function createCalculator(dayjs){
  dayjs.locale('ko');

  function applyTimeDiff(time1,time2) {
    const openingTime = dayjs(`2024-03-14T${time1}:00`);
    const closingTime = dayjs(`2024-03-14T${time2}:00`);
    const timeDiff = closingTime.diff(openingTime,'minutes');
    // console.log(time1 +'~' +time2 + ':'+ timeDiff);
    return timeDiff;
  }
  function applyDateDiff(date1,date2) {
    const openDate = dayjs(`${date1}T00:00:00`);
    const closeDate = dayjs(`${date2}T00:00:00`);
    const dateDiff = closeDate.diff(openDate,'days');
    // console.log(date1 +'~' +date2 + ':'+ dateDiff);
    return dateDiff;
  }
  
  function applyExtractDayOfWeek(date) {
    const dayOfWeek = dayjs(date).format('ddd');
    // console.log(dayOfWeek);
    return dayOfWeek;
  }

  return { applyTimeDiff, applyExtractDayOfWeek, applyDateDiff };
}



