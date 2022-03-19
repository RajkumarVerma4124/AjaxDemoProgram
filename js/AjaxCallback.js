//Importing neccessary module
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let timer = require('./AsyncTimer');


let makeAJAXCall = (methodType, url, callBack, async = true, data = null) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        console.log("State Change Called At... " + timer.showTime() + " || Ready State: " + xhr.readyState + " || Status: " + xhr.status + "\n");
        if (xhr.readyState === 4) {
            //Matching All 200 Series Responses
            if (xhr.status === 200 || xhr.status === 201)
                callBack(xhr.responseText);
            else if (xhr.status >= 400)
                console.log("Handle 400 Client Error Or 500 Server Error" + timer.showTime() + "\n");
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else
        xhr.send();
    console.log(methodType + " Request Send To The Server At :: " + timer.showTime() + "\n");
}

//Retreiving data form json server
const getURL = "http://localhost:3000/employees/";
let getUserDetails = (data) => console.log("Get User Data: " + data);
makeAJAXCall("GET", getURL, getUserDetails);
console.log("Made Get Ajax Call To The Server At :: " + timer.showTime() + "\n");

//Post data into json server
const deleteURL = "http://localhost:3000/employees/2";
let userDeleted = (data) => console.log("User Deleted: " + data);
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made Delete Ajax Call  To The Server " + timer.showTime() + "\n");

//Post data into json server
const postURL = "http://localhost:3000/employees";
const empData = { "firstName": "Ajay", "salary": "55000" };
let userAdded = (data) => console.log("User added : " + data);
makeAJAXCall("POST", postURL, userAdded, true, empData);
console.log("Made Post Ajax Call To The Server " + timer.showTime() + "\n");