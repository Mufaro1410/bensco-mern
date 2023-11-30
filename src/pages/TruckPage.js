import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'antd'
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import axios from 'axios'

const Truck = () => {
    const {truckName} = useParams()
    const [tripsData, setTripsData] = useState([])
    // console.log(tripsData);

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id'
        },{
            title: 'Trip Name',
            dataIndex: 'tripName',
            key: 'tripName'
        },{
            title: 'Truck Name',
            dataIndex: 'truckName',
            key: 'truckName'
        },{
            title: 'Direction',
            dataIndex: 'tripDirection',
            key: 'tripDirection'
        },{
            title: 'Starting Point',
            dataIndex: 'startingPoint',
            key: 'startingPoint',
        },{
            title: 'Ending Point',
            dataIndex: 'endingPoint',
            key: 'endingPoint',
        },{
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },{
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endData'
        },{
            title: 'Trip Duration (hrs)',
            dataIndex: 'tripDuration',
            key: 'tripDuration'
        },{
            title: 'Action',
            render: (record) => {
                return (
                    <Link to={`http://localhost:5001/trips/${record._id}`} className='btn'>Open</Link>
                )
            }
        },
        // {
        //     title: 'Zones',
        //     dataIndex: 'zones',
        //     key: 'zones',
        //     render: (zones) => (
        //         <span>
        //             {zones.map(zonesObj => {
        //                 const zoneNames = Object.keys(zonesObj)
        //                 zoneNames.forEach(zone => {
        //                     return (
        //                         <Tag key={zone}>
        //                             {console.log(zone)}
        //                             {zone}
        //                         </Tag>
        //                     )
        //                 })
        //             })}
        //         </span>
        //     )
        // }
    ]

    useEffect(() => {
        const getTripData = async (name) => {
            const res = await axios.get(`/trips?name=${name}`)
            const data = res.data.trips
            setTripsData(data)
        }
        getTripData(truckName)
    }, [tripsData.length, truckName])

    const createTrips = async () => {
        const url = "http://localhost:5000/trips"
        const data = {}
        const fields = "date,assetName,zones,location,group"
        data['name'] = truckName
        data['fields'] = fields
        const generatedTrips = await axios.post(url, data)
        const newTrips = generatedTrips.data.trips
        newTrips.forEach(trip => {
            setTripsData(prev => [...prev, trip])
        });
    }

    return (
        <section>
            <h3>{truckName}</h3>
            <span>
                <Link to='/trucks' className='btn'>Back To Trucks</Link>
                <button className='btn' onClick={createTrips}>Create Trips</button>
            </span>
            <div>
                {/* {(tripData === 'undefined') ? (
                    <h1>Loading</h1>
                ) : (
                    tripData.map(trip => (
                        <h1 key={trip._id}>{trip.tripName}</h1>
                    ))
                )} */}
                <Table rowKey={tripsData => tripsData._id} dataSource={tripsData} columns={columns}></Table>
            </div>
            <div className='section'>
                <BarChart width={900} height={350} data={tripsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="tripName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tripDuration" fill="#8884d8"/>
                    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                </BarChart> 
            </div>
        </section>
    )
}

export default Truck
