

import { fetchSimple, fetchZone, queryAttributesAll, queryAttributes } from './overpass-api.js'
// import * as overpass from './overass-api.js'
// console.log(overpass)

// fetchZone(46.51351558059737, 6.610379219055176, 2)
//     .then(xml => {
//         const coords = queryAttributesAll(xml, ':scope > node') // :scope is a reference to "resp"
//         // const tags = queryAttributes(xml, 'tag')
//         console.log(coords)
//     })


fetchAttempt(() => fetchZone(46.51351558059737, 6.610379219055176, 2), { attempts: 5 })
    .then(xml => {
        const coords = queryAttributesAll(xml, ':scope > node') // :scope is a reference to "resp"
        // const tags = queryAttributes(xml, 'tag')
        console.log(coords)
    })
    .catch(e => {
        console.log(e)
    })

async function fetchAttempt(func, { attempts = 5 }) {

    let response

    try {
        response = await func()
    } catch (e) {
        if (attempts > 0) {
            console.log('Failed, retrying')
            response = await fetchAttempt(func, attempts - 1)
        } else {
            throw new Error(e);
        }
    }

    return response
}

        // }) => {

        //         .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        //         .then(data => console.log(data));
        // })



