
let url='https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')
let timeIssLocationFetched = document.querySelector('#time')

let update = 10000
let issMarker
let icon = L.icon({
    iconUrl: 'map.png',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
})

let map =L.map('iss-map').setView([0, 0], 1)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



iss(maxFailedAttempts) //call function one time to start
//setInterval(iss,update )//10 secs
function iss(attempts) {

    if(attempts <= 0) {
        alert('Failed after several attempts')
        return
    }



    fetch(url)
        .then(res => res.json())


        .then((issData) => {
        console.log(issData)
        ///display data on web page
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long


        //create marker if does not exist
        //move marker if it does exist

        if (!issMarker) {
            //create marker
            issMarker = L.marker([lat, long],{icon: icon}).addTo(map)

       }else{
            issMarker.setLatLng([lat, long])

        }
        let date = Date ()

            timeIssLocationFetched.innerHTML = `This data was fetched at ${date}`

    })
        .catch((err) => {
        attempts = attempts - 1 //subtract 1 from number of attempts
        console.log('ERROR!', err) ///deals with JSON errors or any errors
    }).finally( ()=> {
        setTimeout(iss, update, attempts)
    })

}