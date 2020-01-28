function request (url) { 
    return new Request(url, {
    method: 'GET',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});}

 async function  getInterSection (url) {
    // Now use it! http://localhost:3000/api/violations?intersections=1&startTime=121212112&endTime=121212121&projects=1,2
    return await fetch(request(url)).then(function (response) {
        return response.json();
    }).then(item=>{
        return item;
    }).catch(function (err) {
        console.log(' err: ', err);
        return [];

    });

}


async function  filters () {
    return await fetch(request('http://localhost:3000/api/violations/init')).then(function (response) {
        return response.json();
    }).then(item=>{
        return item;
    }).catch(function (err) {
        console.log(' err: ', err);
        return [];

    });

}

export default {getInterSection, filters};