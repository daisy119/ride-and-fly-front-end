// npm modules
import { useState, useEffect } from "react"

// components
import TripCard from '../../components/TripCard/TripCard'

//services
import * as tripService from '../../services/tripService'

// css
import './TripList.css'



const TripList = (props) => {
  const [activeTrips, setActiveTrips] = useState([])
  const [completedTrips, setCompletedTrips] = useState([])

  useEffect(() => {
    const active = props.trips.filter(trip => trip.isActive)
    const completed = props.trips.filter(trip => !trip.isActive)
    setActiveTrips(active)
    setCompletedTrips(completed)
  }, [props.trips])

  const handleCompleteTrip = async (tripId) => {
    await tripService.updateTripStatus(tripId, { isActive: false })
    setActiveTrips(activeTrips.filter(trip => trip._id !== tripId))
    const completedTrip = activeTrips.find(trip => trip._id === tripId)
    setCompletedTrips([...completedTrips, { ...completedTrip, isActive: false }])
  } 



  console.log(props.trips)
  return (
    <>
      <main>
        <h2>Active Trips</h2>
        <div className="active-trips">
          {activeTrips.map(trip => (
            <TripCard key={trip._id} trip={trip} onComplete={() => handleCompleteTrip(trip._id)} />
          ))}
        </div>
        <h2>Completed Trips</h2>
        <div className="completed-trips">
          {completedTrips.map(trip => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>

      </main>
    </>
  )
}

export default TripList


            // <h1>Active Trips</h1>
            // {props.trips.map((trip) => (
            //   <TripCard key={trip._id} trip={trip}  />
            // ))}
            // {/* <button onClick={handleCompleteTrip}>Click Here</button> */}