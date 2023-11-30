const axios = require('axios')

const clearAPI = (id, token) => {
    const delUrl = `https://export.us1.kt1.io/v2/stream/${id}?token=${token}`
    axios.delete(delUrl)
    .then((response) => {
        console.log(`ID:${id} Deleted Successfully`);
        return `Deleted Successfully! ${response}`
    })
    .catch((error) => {
        console.error(`Error fetching data, ${error}`);
        return `Failed to Delete ID ${id}`
    })
}

module.exports = clearAPI