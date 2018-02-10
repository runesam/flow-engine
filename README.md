# Hubrick Frontend Challenge

## Introduction

#### A flow engine is an application that executes a flow consisting of several linked rules, in this case against some incoming data (*a JSON string that can be parsed to a JavaScript object literal*).

## Installation
    npm i
#### to run the app
    npm start

#### to run tests
    npm test
    
## Navigation
    http://localhost:3000/
###### change port '3000' to the provided port in case it was busy.
    
## Find in the app
* Eslint Airbnb
* Mocha as test framework
* Parcel bundler

##### objects to pass most of the rules
    { "color": "red" }
or

    { "background": "white" }
    
as the rules are

    [
        {
            "id": "1",
            "title": "Should be an Object ",
            "func": "obj => Object.prototype.toString.call(obj) === '[object Object]'",
            "true_id": "1",
            "false_id": null
        },
        {
            "id": "2",
            "title": "Should have a key called \"color\"",
            "func": "obj => Object.hasOwnProperty.call(obj, 'color')",
            "true_id": "3",
            "false_id": "4"
        },
        {
            "id": "3",
            "title": "the object's color should be \"red\"",
            "func": "obj => obj.color === 'red'",
            "true_id": "6",
            "false_id": null
        },
        {
            "id": "4",
            "title": "Should have a key called \"background\"",
            "func": "obj => Object.hasOwnProperty.call(obj, 'background')",
            "true_id": "5",
            "false_id": null
        },
        {
            "id": "5",
            "title": "the object's background should be \"white\"",
            "func": "obj => obj.background === 'white'",
            "true_id": "6",
            "false_id": null
        },
        {
            "id": "6",
            "title": "the Object had only one property",
            "func": "obj => Object.keys(obj).length === 1",
            "true_id": null,
            "false_id": null
        }
    ]