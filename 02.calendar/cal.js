import { default as minimist } from "minimist";

let argv = minimist(process.argv.slice(2));

let today = new Date();

function decide_month(params) {
  if (Object.prototype.hasOwnProperty.call(params, "m")) {
    return params.m;
  } else {
    return today.getMonth() + 1;
  }
}

function decide_year(params) {
  if (Object.prototype.hasOwnProperty.call(params, "y")) {
    return params.y;
  } else {
    return today.getFullYear();
  }
}

//月と年の表示
let target_month = decide_month(argv);
let target_year = decide_year(argv);
console.log(target_month + "月 " + target_year);

let first_day = new Date(target_year, target_month - 1);
let last_day = new Date(target_year, target_month, 0);

//曜日の表示
const days_of_week = ["日", "月", "火", "水", "木", "金", "土"];
console.log(days_of_week.join(" "));

let days = [];
for (let day = first_day.getDate(); day <= last_day.getDate(); day++) {
  days.push(day);
}
let week1 = days.slice(0,7);
let week2 = days.slice(7,14);
let week3 = days.slice(14,21);
let week4 = days.slice(21,28);
let week5 = days.slice(28);

console.log(week1.join(' '));
console.log(week2.join(' '));
console.log(week3.join(' '));
console.log(week4.join(' '));
console.log(week5.join(' '));
