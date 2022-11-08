let promise = fetch("https://jsonplaceholder.typicode.com/users/5");

let secondPromise = promise.then(function(response){
    console.log(response);
    return response.json();
    //return JSON.parse(respone.body);
});

secondPromise.then(function (data){
    console.log(data);
});