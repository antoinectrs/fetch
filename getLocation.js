let map;
export const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
};

export function drawMap(lat, lon,zoom = 15) {
     map = L.map('map').setView([lat, lon], zoom);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYW50b2luZTk4IiwiYSI6ImNsMGprazdncDAxYzYzZWxhbzRlcWk2NDkifQ.JM4Xgke091LLntRvk9UbrA'
    }).addTo(map);
}

export function drawPastArea(content) {
   
    // PARAMS.data.content.forEach(element => {
       
        content.forEach( function (value, index) {
        let marker = L.marker([value.lat, value.lon]).addTo(map);
        let ellipse =L.circle([value.lat, value.lon], {
            color: 'none',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 40
        }).addTo(map);
        const text = ""+value.info;
        ellipse.bindPopup(text);
    });

}