const trips = []
    
// trip variables
const tripVariables = {tripName:'', tripDirection: '', startingPoint: '', endingPoint: '', 
    startDate: '', endDate: '', tripDuration: '', zones: []}

// zones variables
const zoneVariables = {zoneTimeIn: '', zoneTimeOut: '', timeTracker: '', zoneTracker: '', 
    currentZone: '', currentZonesObject: {}, inOffloadingZone: false}

async function tripProcessor(data, name) {
    await data.forEach((item) => {
        if (item.group.groupName === 'loading') {
            if (tripVariables['tripDirection'] === '') {
                // start new trip (set trip variables)
                setTripVariables('Delivery', item.location.address, item.date, '', '', [], name)
                // start new trip (set zone variables)
                setTripZoneVariables(item.date, '', item.location.address, 'loading')
            } else if (tripVariables['tripDirection'] === 'Delivery') {
                if (zoneVariables['currentZone'] !== item.location.address) {
                    // closing previous zone
                    closeZone(zoneVariables['timeTracker'])
                    // opening new zone
                    openZone(item.date, '', item.location.address, {})
                } else {
                    zoneVariables['timeTracker'] = item.date
                }
            } else {
                // closing zone
                closeZone(zoneVariables['timeTracker'])
                // closing trip
                closeTrip(name, tripVariables['tripName'], tripVariables['tripDirection'], tripVariables['startingPoint'],
                    tripVariables['startDate'], tripVariables['zones'])
                
                // start new trip (trip variables)
                setTripVariables('Delivery', item.location.address, item.date, '', '', [], name)
                // start new trip (zone variables)
                setTripZoneVariables(item.date, '', item.location.address, 'loading')
            }
        } else if (item.group.groupName === 'offloading') {
            zoneVariables['inOffloadingZone'] = true
            // if (tripDirection === 'Delivery') {
            if (item.location.address !== zoneVariables['currentZone']) {
                // close zone
                closeZone(zoneVariables['timeTracker'])
                // open new zone
                openZone(item.date, '', item.location.address, {})
            } else {
                zoneVariables['timeTracker'] = item.date
            }
            // }
        } else {
            if (tripVariables['tripDirection'] === 'Delivery' & zoneVariables['inOffloadingZone']) {
                // close zone
                closeZone(zoneVariables['timeTracker'])
                // close trip
                closeTrip(name, tripVariables['tripName'], tripVariables['tripDirection'], tripVariables['startingPoint'],
                    tripVariables['startDate'], tripVariables['zones'])

                // start new trip (set trip variables)
                setTripVariables('Return', item.location.address, item.date, '', '', [], name)
                // start new trip (set zone variables)
                setTripZoneVariables(item.date, '', item.location.address, 'offloading', false)
            } else {
                if (zoneVariables['currentZone'] !== item.location.address) {
                    // close zone
                    closeZone(zoneVariables['timeTracker'])
                    // open new zone
                    openZone(item.date, '', item.location.address, {})
                } else {
                    zoneVariables['timeTracker'] = item.date
                }
            }
        }
    })
    return trips
}

function setTripVariables(tripLag, location, startDate, endDate, tripDuration, zones, name) {
    // set trip variables
    tripVariables['tripDirection'] = tripLag
    tripVariables['startingPoint'] = location
    tripVariables['startDate'] = startDate
    tripVariables['endDate'] = endDate
    tripVariables['tripDuration'] = tripDuration
    tripVariables['zones'] = zones
    tripVariables['tripName'] = TripNameGenerator(name, startDate, tripLag)
}

function setTripZoneVariables(currentTime, timeOut, zone, groupName, inOffloading){
    // set zone variables
    zoneVariables['zoneTimeIn'] = currentTime
    zoneVariables['zoneTimeOut'] = timeOut
    zoneVariables['timeTracker'] = currentTime
    zoneVariables['zoneTracker'] = zone
    zoneVariables['currentZone'] = zone
    zoneVariables['currentZonesObject']['zoneName'] = zone
    zoneVariables['currentZonesObject']['timeIn'] = currentTime
    zoneVariables['group'] = groupName
    zoneVariables['inOffloadingZone'] = inOffloading
}

function openZone(timeIn, timeOut, zone, zoneObj) {
    // open new zone (set zone variables)
    zoneVariables['zoneTimeIn'] = timeIn
    zoneVariables['zoneTimeOut'] = timeOut
    zoneVariables['timeTracker']= timeIn
    zoneVariables['zoneTracker'] = zone
    zoneVariables['currentZone'] = zone
    zoneVariables['currentZonesObject'] = zoneObj
    zoneVariables['currentZonesObject']['zoneName'] = zone
    zoneVariables['currentZonesObject']['timeIn'] = timeIn
}

function closeZone(timeOut) {
    // close zone (zone variables)
    zoneVariables['zoneTimeOut'] = timeOut
    zoneVariables['currentZonesObject']['timeOut'] = timeOut
    zoneVariables['currentZonesObject']['zoneDuration'] = getHoursDiff(zoneVariables['zoneTimeIn'], timeOut)
    tripVariables['zones'].push(zoneVariables['currentZonesObject'])
}

function closeTrip(name, tripName, tripDirection, startingPoint, startDate, zones) {
    // filling in empty trip variables
    tripVariables['endingPoint'] = zoneVariables['zoneTracker']
    tripVariables['endDate'] = zoneVariables['timeTracker']
    let tripDuration = getHoursDiff(tripVariables['startDate'], tripVariables['endDate'])
    // adding a trip to trip array
    trips.push({truckName:name, tripName:tripName, tripDirection:tripDirection, startingPoint:startingPoint,
        endingPoint:tripVariables['endingPoint'], startDate:startDate, endDate:tripVariables['endDate'], tripDuration:tripDuration, zones:zones})
}

function TripNameGenerator(truckname, startDate, tripDirection) {
    const name = truckname.split(' (')[0]
    const date = new Date(startDate).toISOString().split('T')[0]
    const leg = tripVariables['tripDirection'].slice(0, 3)
    const tripname = `${name} ${date} ${leg}`
    return tripname
}

function getHoursDiff(startDate, endDate) {
    const msInHour = 1000 * 60 * 60;
    return Math.abs(endDate - startDate) / msInHour
    // return Math.round(Math.abs(endDate - startDate) / msInHour);
}
            
module.exports = tripProcessor