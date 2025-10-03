console.log("Hello, world!")

var random_number = 0;
var iterations = 0;

import {bool, changeBool} from "./test_2.js"

while(bool){
    random_number = Math.floor(Math.random() * 1001)
    if(random_number > 998){
        // setBool(false)
        changeBool(false);
    }
    iterations = increase(iterations)
    console.log(`Random Number : ${random_number} - Iteration: ${iterations}`)
}

function increase(num){return num+=1}