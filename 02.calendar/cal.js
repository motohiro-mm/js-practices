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

let target_month = decide_month(argv);
let target_year = decide_year(argv);
console.log("       " + target_month + "月 " + target_year);

let first_date = new Date(target_year, target_month - 1);
let last_date = new Date(target_year, target_month, 0);

const days_of_week = ["日", "月", "火", "水", "木", "金", "土"];
console.log(days_of_week.join(" "));

let days = [];

for (let day = first_date.getDate(); day <= last_date.getDate(); day++) {
  days.push(day.toString().padStart(2));
}

let first_wday = first_date.getDay();

let week1 = days.slice(0, 7 - first_wday);
let week2 = days.slice(7 - first_wday, 7 * 2 - first_wday);
let week3 = days.slice(7 * 2 - first_wday, 7 * 3 - first_wday);
let week4 = days.slice(7 * 3 - first_wday, 7 * 4 - first_wday);
let week5 = days.slice(7 * 4 - first_wday, 7 * 5 - first_wday);
let week6 = days.slice(7 * 5 - first_wday);

console.log(week1.join(" ").padStart(20));
console.log(week2.join(" "));
console.log(week3.join(" "));
console.log(week4.join(" "));
console.log(week5.join(" "));
console.log(week6.join(" "));
