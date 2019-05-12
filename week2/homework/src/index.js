'use strict';
var program = require('commander');

// TODO: Write the homework code in this file
const fs = require("fs");
const express = require("express");
const app = express();

switch (process.argv[2]) {
  default:
  case "help":
    fs.readFile("./help.txt", "UTF-8", (err, data) => {
      console.log(data);
    });
    break;

  case "add":
    fs.readFile("./to-dos.txt", "UTF-8", (err, data) => {
      if (err) throw err;
      let todoList = JSON.parse(data);
      let item = { item: process.argv[3] };
      todoList.push(item);
      fs.writeFileSync(
        "./to-dos.txt",
        JSON.stringify(todoList)
      );
      console.log(`item ${process.argv[3]} is added`);
    });
    break;

  case "remove":
    fs.readFile("./to-dos.txt", "UTF-8", (err, data) => {
      if (err) throw err;
      let todoList = JSON.parse(data);
      if (todoList.length == 0) {
        console.log(
          "The list is empty ---> nothing to remove"
        );
      } else {
        todoList.splice(process.argv[3] - 1, 1);
        console.log(`item ${process.argv[3]} is removed`);
        fs.writeFileSync(
          "./to-dos.txt",
          JSON.stringify(todoList)
        );
      }
    });
    break;

  case "list":
    fs.readFile("./to-dos.txt", "utf-8", (err, data) => {
      let items = JSON.parse(data);
      console.log(items);

      console.log(`the list contains: `);
      for (let i of items) {
        console.log(i.item);
      }
    });
    break;

  case "reset":
    fs.writeFile("./to-dos.txt", reset(), err => {
      if (err) throw err;
    });
    function reset() {
      let reset = [];
      return JSON.stringify(reset);
    }
    console.log("list reseted");
    break;
}

// console.log(process.argv);
// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
