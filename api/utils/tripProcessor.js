// const timeDelta = require('time-delta')
// const instance = timeDelta.create({locale: 'en'})

async function tripProcessor(data, name) {
    var trips = []
    
    // trip variables
    var tripName = ''
    var tripDirection = ''
    var startingPoint = ''
    var endingPoint = ''
    var startDate = ''
    var endDate = ''
    var tripDuration = ''
    var zones = []

    // zones variables
    var zoneTimeIn = ''
    var zoneTimeOut = ''
    var timeTracker = ''
    var zoneTracker = ''
    var currentZone = ''
    var currentZonesObject = {}
    // var tripsZonesObject = {}

    var inOffloadingZone = false

    await data.forEach((item) => {
        if (item.group.groupName === 'loading') {
            if (tripDirection === '') {
                // setting new trip (trip variables)
                tripDirection = 'Delivery'
                startingPoint = item.location.address
                startDate = item.date
                endDate = ''
                tripDuration = ''
                zones = []
                tripName = TripNameGenerator(name, startDate, tripDirection)
    
                // setting new trip zone variables
                zoneTimeIn = item.date
                zoneTimeOut = ''
                timeTracker = item.date
                zoneTracker = item.location.address
                currentZone = item.location.address
                currentZonesObject['zoneName'] = item.location.address
                currentZonesObject['timeIn'] = zoneTimeIn
                // tripsZonesObject = {}
                group = 'loading'
            } else if (tripDirection === 'Delivery') {
                if (currentZone !== item.location.address) {
                    // closing previous zone variables
                    zoneTimeOut = timeTracker
                    currentZonesObject['timeOut'] = zoneTimeOut
                    currentZonesObject['zoneDuration'] = getHoursDiff(zoneTimeIn, zoneTimeOut)
                    // tripsZonesObject[currentZone] = currentZonesObject
                    zones.push(currentZonesObject)

                    // opening new zone variables
                    zoneTimeIn = item.date
                    zoneTimeOut = ''
                    timeTracker = item.date
                    zoneTracker = item.location.address
                    currentZone = item.location.address
                    currentZonesObject = {}
                    currentZonesObject['zoneName'] = item.location.address
                    currentZonesObject['timeIn'] = zoneTimeIn
                } else {
                    timeTracker = item.date
                }
            } else {
                // closing Return trip (zone variables)
                zoneTimeOut = timeTracker
                currentZonesObject['timeOut'] = zoneTimeOut
                currentZonesObject['zoneDuration'] = getHoursDiff(zoneTimeIn, zoneTimeOut)
                // tripsZonesObject[currentZone] = currentZonesObject
                zones.push(currentZonesObject)

                // closing Return trip (trip variables)
                endingPoint = item.location.address
                endDate = timeTracker
                tripDuration = getHoursDiff(startDate, endDate)
                // zones.push(tripsZonesObject)
                trips.push({truckName:name, tripName:tripName, tripDirection:tripDirection, startingPoint:startingPoint,
                    endingPoint:endingPoint, startDate:startDate, endDate:endDate, tripDuration:tripDuration, zones:zones})
                
                // setting new trip (trip variables)
                tripDirection = 'Delivery'
                startingPoint = item.location.address
                startDate = item.date
                endDate = ''
                tripDuration = ''
                zones = []
                tripName = TripNameGenerator(name, startDate, tripDirection)
    
                // setting new trip (zone variables)
                zoneTimeIn = item.date
                zoneTimeOut = ''
                timeTracker = item.date
                zoneTracker = item.location.address
                currentZone = item.location.address
                currentZonesObject['zoneName'] = item.location.address
                currentZonesObject['timeIn'] = zoneTimeIn
                // tripsZonesObject = {}
                group = 'loading'
            }
        } else if (item.group.groupName === 'offloading') {
            inOffloadingZone = true
            // if (tripDirection === 'Delivery') {
            if (item.location.address !== currentZone) {
                // closing previous zone variables
                zoneTimeOut = timeTracker
                currentZonesObject['timeOut'] = zoneTimeOut
                currentZonesObject['zoneDuration'] = getHoursDiff(zoneTimeIn, zoneTimeOut)
                // tripsZonesObject[currentZone] = currentZonesObject
                zones.push(currentZonesObject)
                
                // opening new zone variables
                zoneTimeIn = item.date
                zoneTimeOut = ''
                timeTracker = item.date
                zoneTracker = item.location.address
                currentZone = item.location.address
                currentZonesObject = {}
                currentZonesObject['zoneName'] = item.location.address
                currentZonesObject['timeIn'] = zoneTimeIn
                
            } else {
                timeTracker = item.date
            }
            // }
        } else {
            if (tripDirection === 'Delivery' & inOffloadingZone) {
                // closing Delivery trip (zone variables)
                zoneTimeOut = timeTracker
                currentZonesObject['timeOut'] = zoneTimeOut
                currentZonesObject['zoneDuration'] = getHoursDiff(zoneTimeIn, zoneTimeOut)
                // tripsZonesObject[currentZone] = currentZonesObject
                zones.push(currentZonesObject)

                // closing Delivery trip (trip variables)
                endingPoint = zoneTracker
                endDate = timeTracker
                tripDuration = getHoursDiff(startDate, endDate)
                // zones.push(tripsZonesObject)
                trips.push({truckName:name, tripName:tripName, tripDirection:tripDirection, startingPoint:startingPoint,
                    endingPoint:endingPoint, startDate:startDate, endDate:endDate, tripDuration:tripDuration, zones:zones})
                
                // setting new trip (trip variables)
                tripDirection = 'Return'
                startingPoint = zoneTracker
                startDate = item.date
                endDate = ''
                tripDuration = ''
                zones = []
                tripName = TripNameGenerator(name, startDate, tripDirection)

                // setting new trip (zone variables)
                zoneTimeIn = item.date
                zoneTimeOut = ''
                timeTracker = item.date
                zoneTracker = item.location.address
                currentZone = item.location.address
                inOffloadingZone = false
                currentZonesObject['zoneName'] = item.location.address
                currentZonesObject['timeIn'] = zoneTimeIn
                // tripsZonesObject = {}
            } else {
                if (currentZone !== item.location.address) {
                    // closing previous zone variables
                    zoneTimeOut = timeTracker
                    currentZonesObject['timeOut'] = zoneTimeOut
                    currentZonesObject['zoneDuration'] = getHoursDiff(zoneTimeIn, zoneTimeOut)
                    // tripsZonesObject[currentZone] = currentZonesObject
                    zones.push(currentZonesObject)
    
                    // opening new zone variables
                    zoneTimeIn = item.date
                    zoneTimeOut = ''
                    timeTracker = item.date
                    zoneTracker = item.location.address
                    currentZone = item.location.address
                    currentZonesObject = {}
                    currentZonesObject['zoneName'] = item.location.address
                    currentZonesObject['timeIn'] = zoneTimeIn
                } else {
                    timeTracker = item.date
                }
            }
        }
    })
    return trips
}

function setTripVariables() {
    // setting new trip (trip variables)
    tripDirection = 'Delivery'
    startingPoint = item.location.address
    startDate = item.date
    endDate = ''
    tripDuration = ''
    zones = []
    tripName = TripNameGenerator(name, startDate, tripDirection)

    // setting new trip (zone variables)
    zoneTimeIn = item.date
    zoneTimeOut = ''
    timeTracker = item.date
    zoneTracker = item.location.address
    currentZone = item.location.address
    currentZonesObject['zoneName'] = item.location.address
    currentZonesObject['timeIn'] = zoneTimeIn
    // tripsZonesObject = {}
    group = 'loading'
}

function TripNameGenerator(truckname, startDate, tripDirection) {
    const name = truckname.split(' (')[0]
    const date = new Date(startDate).toISOString().split('T')[0]
    const leg = tripDirection.slice(0, 3)
    const tripname = `${name} ${date} ${leg}`
    return tripname
}

function getHoursDiff(startDate, endDate) {
    const msInHour = 1000 * 60 * 60;
    return Math.abs(endDate - startDate) / msInHour
    // return Math.round(Math.abs(endDate - startDate) / msInHour);
}
            
module.exports = tripProcessor