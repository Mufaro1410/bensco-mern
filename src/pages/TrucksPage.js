import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const TrucksPage = () => {
    const [trucksData, setTrucksData] = useState([])

    useEffect(() => {
        const getTrucksData = async () => {
            const res = await axios.get('http://localhost:5001/trucks')
            const data = res.data.trucks
            setTrucksData(data)
        }

        getTrucksData()

        // axios.get('/trucks').then(
        //     data => {
        //         setTrucksData(data.data)
        //         console.log(data.data);
        //     }
        // )
    }, [trucksData.length])

    const createTrucks = async () => {
        const url = "http://localhost:5001/trucks"
        const generatedTrucks = await axios.post(url)
        const newTrucks = generatedTrucks.data.trucks
        newTrucks.forEach(truck => {
            if (!(truck in trucksData)) {
                setTrucksData(prev => [...prev, truck])
            }
        });
    }

    return(
        <section>
            <h1>Trucks</h1>
            <button className='btn' onClick={createTrucks}>Create Trucks</button>
            <div className='trucks--container'>
                {(typeof trucksData === 'undefined') ? (
                    <h1>Loading...</h1>
                ) : (
                    trucksData.map((truck) => (
                        <article key={truck._id} className='trucks--card'>
                            <h5>{truck.assetName}</h5>
                            <Link to={`/trucks/${truck.assetName}`} className='btn'>Open</Link>
                        </article>
                    ))
                )}
            </div>
        </section>
    )
}

export default TrucksPage
