export function fetchZone(latitude, longitude, distance = 2) {

    const bbox = getBoundingBox({ latitude, longitude, distance })

    return fetchSimple(`
    node
        [leisure=playground]
        (${bbox.join(',')});
    out;
    `)

}


export async function fetchSimple(requestText) {

    const body = `data=${encodeURI(requestText)}`
    let text;
    const resp = await fetch("https://overpass-api.de/api/interpreter", {
        headers: {
            // "accept": "*/*",
            // "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            // "pragma": "no-cache",
            // "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
            // "sec-ch-ua-mobile": "?0",
            // "sec-ch-ua-platform": "\"macOS\"",
            // "sec-fetch-dest": "empty",
            // "sec-fetch-mode": "cors",
            // "sec-fetch-site": "cross-site"
        },
        // "referrer": "https://overpass-turbo.eu/",
        // "referrerPolicy": "strict-origin-when-cross-origin",
        body,
        method: "POST",
        // "mode": "cors",
        // "credentials": "omit"
    })

    if (!resp.ok) {
        throw new Error(resp.statusText)
    }

    text = await resp.text()


    return new DOMParser().parseFromString(text, "text/xml")
}

// window.fetchOverpass = fetchOverpass

export function getAttributes(domElem) {
    return Object.fromEntries([...domElem.attributes].map(a => [a.name, a.value]))
}

// querySelectorAll
// querySelector
export function queryAttributes(parent, selector) {
    const node = parent.querySelector(selector);
    return getAttributes(node)
}

export function queryAttributesAll(parent, selector) {
    const nodes = parent.querySelectorAll(selector);
    return [...nodes].map(getAttributes)
}


// http://www.java2s.com/example/nodejs/geometry/calculate-the-bounding-box-for-a-given-lat-lng-location.html
export function getBoundingBox({ latitude, longitude, distance }) {
    var MIN_LAT, MAX_LAT, MIN_LON, MAX_LON, R, radDist, degLat, degLon, radLat, radLon, minLat, maxLat, minLon, maxLon, deltaLon;
    if (distance < 0) {
        return 'Illegal arguments';
    }
    // helper functions (degrees<?>radians)
    // coordinate limits
    MIN_LAT = degToRad(-90);
    MAX_LAT = degToRad(90);
    MIN_LON = degToRad(-180);
    MAX_LON = degToRad(180);
    // console.log(latitude, longitude, distance);
    // Earth's radius (km)
    R = 6378.1;
    // angular distance in radians on a great circle
    radDist = distance / R;
    // center point coordinates (deg)
    degLat = latitude;
    degLon = longitude;
    // center point coordinates (rad)
    radLat = degToRad(degLat);
    radLon = degToRad(degLon);
    // minimum and maximum latitudes for given distance
    minLat = radLat - radDist;
    maxLat = radLat + radDist;
    // minimum and maximum longitudes for given distance
    minLon = void 0;
    maxLon = void 0;
    // define deltaLon to help determine min and max longitudes
    deltaLon = Math.asin(Math.sin(radDist) / Math.cos(radLat));
    if (minLat > MIN_LAT && maxLat < MAX_LAT) {
        minLon = radLon - deltaLon;
        maxLon = radLon + deltaLon;
        if (minLon < MIN_LON) {
            minLon = minLon + 2 * Math.PI;
        }
        if (maxLon > MAX_LON) {
            maxLon = maxLon - 2 * Math.PI;
        }
    }
    // a pole is within the given distance
    else {
        minLat = Math.max(minLat, MIN_LAT);
        maxLat = Math.min(maxLat, MAX_LAT);
        minLon = MIN_LON;
        maxLon = MAX_LON;
    }
    return [
        radToDeg(minLat),
        radToDeg(minLon),
        radToDeg(maxLat),
        radToDeg(maxLon)
    ];
};

function degToRad(number) {
    return number * (Math.PI / 180);
};
function radToDeg(number) {
    return (180 * number) / Math.PI;
};