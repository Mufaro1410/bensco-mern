import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import axios from "axios"

const TripPage = () => {
    const {tripId} = useParams()
    const [tripData, setTripsData] = useState({})
    
    useEffect(() => {
        const getTripData = async () => {
            const res = await axios.get(`http://localhost:5001/trips/${tripId}`)
            const data = res.data.trip
            setTripsData(data)
        }
        getTripData()
    }, [tripId])

    return (
        <section className="section">
            <Link to={`http://localhost:5001/trucks/${tripData.truckName}`} className="btn">Back to Truck Page</Link>
            {/* <h3>{tripData.tripName}</h3> */}
            <div style={{border: 'solid', padding: '2rem', borderRadius: '10px'}}>
                {/* <h3>Trip ID: {tripData._id}</h3> */}
                <h5>Truck Name: {tripData.truckName}</h5>
                <h5>Trip Name: {tripData.tripName}</h5>
                <h5>Trip Direction: {tripData.tripDirection}</h5>
                <h5>Starting Point: {tripData.startingPoint}</h5>
                <h5>Ending Point: {tripData.endingPoint}</h5>
                <h5>Start Date: {tripData.startDate}</h5>
                <h5>End Date: {tripData.endDate}</h5>
                <h5>Trip Duration: {tripData.tripDuration} hr(s)</h5>
                {/* <h5>{tripData.zones}</h5> */}
            </div>
            <div>
                <ResponsiveContainer width='100%' aspect={3}>
                    <BarChart width={900} height={350} data={tripData.zones} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey='zoneName' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='zoneDuration' fill="#8884d8"/>
                        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}

export default TripPage
