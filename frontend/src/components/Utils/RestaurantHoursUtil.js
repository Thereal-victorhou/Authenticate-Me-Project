const numberToDay = {
  '0': 'Mon',
  '1': 'Tue',
  '2': 'Wed',
  '3': 'Thu',
  '4': 'Fri',
  '5': 'Sat',
  '6': 'Sun'
}

const formatOperatingHours = async (arr) => {

  const dailyHours = { weekArr: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };

  await arr.forEach(day => {

    const dayWord = numberToDay[day.day];
    const startTime = convertMilitaryToStandard(day.start);
    const endTime = convertMilitaryToStandard(day.end);;

    if (!(dayWord in dailyHours)) dailyHours[dayWord] = [[startTime, endTime]]
    else dailyHours[dayWord].push([startTime, endTime])

  })

  return dailyHours

}


function convertMilitaryToStandard(time) {
  // Ensure time is in 'HH:mm' format

  const hour = time.slice(0, 2)
  const minute = time.slice(2)

  const modifier = +hour < 12 ? 'AM' : 'PM';
  let standardHours = +hour % 12 || 12;

  return `${standardHours}:${minute} ${modifier}`;
}
