const { MongoClient, ServerApiVersion } = require("mongodb");

const start = async () => {
    const uri = 'mongodb+srv://bensco:VtVNzw7m09VjB8qv@cluster0.sd8elyq.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const dbName = "bensco-telematrics";
    try {
        await client.connect()
        console.log('Succesfully connected...');
        const db = client.db(dbName)
        const res = await db.collection('H06 (JN 05 JL GP)_raw').find()
        console.log(res);

        // app.listen(port, console.log(`Server listening on port ${port}`))
        // const assetName = 'H06 (JN 05 JL GP)_raw'
        // const data = await axios.get(`http://localhost:5000/api/data-points/${assetName}`)
        // // const data = res.json()
        // console.log(data)
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()

// export const useFetchDataPoints = () => (assetName, startDate, endDate) => {

//     return fetch(`http://localhost:3002/api/data-points/${assetName}/clean/${startDate}/${endDate}`)
//       .then((data) => data.json())
//       .then((json) => json)
//       .catch((error) => console.log(`Error fetching data points: ${error}`));
// };