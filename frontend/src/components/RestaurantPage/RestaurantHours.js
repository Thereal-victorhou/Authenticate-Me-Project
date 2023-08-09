import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
// import { formatOperatingHours } from '../Utils/RestaurantHoursUtil'

function RestaurantHours({ currentRestaurant }) {

  const weekArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const restaurantState = useSelector((state) => Object.values(state.restaurant))
  const timeObj = restaurantState[0]?.hours;
  const openHoursObj = timeObj?.open;

  // Get current day to determine where 'Open' of 'Closed' label goes
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date();
  const dayName = days[date.getDay()];

  // Take in openHoursObj and render formated time depending on array length
  const renderHours = (openObj, day) => {
    const currentDay = openObj[day]

    if (currentDay.length === 1) {
      const updatedTime = currentDay.join(' - ').replace(/,/ , ' - ')
      return (
        <div className='hour-container'>
          <p>{`${updatedTime}`}</p>
        </div>
      )
    }

    if (currentDay.length === 2) {
      const updatedTime1 = currentDay[0].join(' - ').replace(/,/ , ' - ')
      const updatedTime2 = currentDay[1].join(' - ').replace(/,/ , ' - ')

      return (
        <div className='hour-container'>
          <p>{`${updatedTime1} ${updatedTime2}`}</p>
        </div>
      )
    }

    // if (currentDay.length === 3) {
    //   console.log('length 3')

    //   return (
    //     <div className='hour-container'>
    //       <p>{`${currentDay[0]} - ${currentDay[1]}`}</p> <p>{`${currentDay[2]} - ${currentDay[3]}`}</p><p>{`${currentDay[4]} - ${currentDay[5]}`}</p>
    //     </div>
    //   )
    // }
  }

  // Determine current day and when to place 'Open' or 'Closed' label
  const isBusinessOpen = (timeObj, day) => {
    if (day !== dayName) return;
    if (timeObj?.isOpenNow === true) {
      return (
        <p id='open-now'>Open now</p>
      )
    }
    if (timeObj?.isOpenNow === false) {
      return (
        <p id='closed-now'>Closed now</p>
      )
    }
  }



  // if (dailyHours) {

    return (
      <ul>
        {weekArr?.map(day => (
          <>
            <div className='business-hours-container'>
              <div className='day-container'>
                <p>{day}</p>
              </div>
              {openHoursObj ? renderHours(openHoursObj, day) : ''}
            <div className='is-business-open'>
              {isBusinessOpen(timeObj, day)}
            </div>
            </div>
          </>
        ))}
      </ul>


    )
  // }

}
export default RestaurantHours;
