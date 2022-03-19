//Importing neccessary module
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let timer = require('./AsyncTimer');

let makePromiseCall = (methodType, url, async = true, data = null) => {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("State Change Called At..." + timer.showTime() + " || Ready State: " + xhr.readyState + " || Status: " + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR failed");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
        console.log(methodType + " Request Send To The Server At :: " + timer.showTime() + "\n");
    });
}

//Retreiving data form json server
const getURL = "http://localhost:3000/employees/";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User data:" + responseText);
    })
    .catch(error => console.log("GET Error Status:" + JSON.stringify(error)));


//Deleting data from json server 
const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DElETE", deleteURL, false)
    .then(responseText => {
        console.log("User Deleted:" + responseText);
    })
    .catch(error => console.log("DELETE Error Status:" + JSON.stringify(error)));


//Post data into json server
const postURL = "http://localhost:3000/employees";
const empData = { "firstName": "Aman", "salary": "42000" }
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added :" + responseText);
    })
    .catch(error => console.log("POST Error Status:" + JSON.stringify(error)));