import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Table} from 'antd'

const ZonePage = () => {
    const {zoneId} = useParams()
    const [ zoneData, setZoneData] = useState({})

    useEffect(() => {
        const getZone = async () => {
            const res = await axios.get(`http://localhost:5001/zones/${zoneId}`)
            const data = res.data.zone
            setZoneData(data)
        }
        getZone()
    }, [zoneId])

    return (
        <section>
            <h1>Zones</h1>
            <div>
                <Link to='/zones' className='btn'>Back To Zones</Link>
                <Table dataSource = {zoneData} columns = {[]} ></Table>
            </div>
        </section>
    )
}

export default ZonePage
