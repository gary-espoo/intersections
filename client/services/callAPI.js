const baseViolationAPI = '/api/violations';
const filtersAPI= '/api/violations/init';
function request(url) {
    return new Request(url, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
}

async function getViolations(params=null) {
    let url = baseViolationAPI;
    if(params){        
        url = url.concat(params);
    } 
    console.log('calling' + url)
    return await fetch(request(url)).then(function (response) {
        return response.json();
    }).then(item => {
        return item;
    }).catch(function (err) {
        console.log(' err: ', err);
        return [];

    });

}

async function filters() {
    return await fetch(request(filtersAPI)).then(function (response) {
        return response.json();
    }).then(item => {
        return item;
    }).catch(function (err) {
        console.log(' err: ', err);
        return [];

    });

}

export default {
    getViolations,
    filters
};