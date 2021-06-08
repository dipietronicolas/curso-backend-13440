"use strict";
var operacion = function (num1, num2, op) {
    return new Promise(function (resolve, reject) {
        if (op === "suma") {
            resolve(num1 + num2);
        }
        else if (op === "resta") {
            resolve(num1 - num2);
        }
        else {
            reject("Not a valid operation");
        }
    });
};
var operaciones = function () {
    operacion(2, 3, "suma").then(function (result) { return console.log(result); }).catch(function (e) { return console.log(e); });
    operacion(7, 3, "resta").then(function (result) { return console.log(result); }).catch(function (e) { return console.log(e); });
};
operaciones();
