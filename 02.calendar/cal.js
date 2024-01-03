import minimist from "minimist";

function decideMonth(argv) {
  if (Object.prototype.hasOwnProperty.call(argv, "m")) {
    return argv.m;
  } else {
    return today.getMonth() + 1;
  }
}

function decideYear(argv) {
  if (Object.prototype.hasOwnProperty.call(argv, "y")) {
    return argv.y;
  } else {
    return today.getFullYear();
  }
}

let argv = minimist(process.argv.slice(2));
let today = new Date();
let targetMonth = decideMonth(argv);
let targetYear = decideYear(argv);
console.log("       " + targetMonth + "月 " + targetYear);

const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
console.log(daysOfWeek.join(" "));

let firstDate = new Date(targetYear, targetMonth - 1);
let lastDate = new Date(targetYear, targetMonth, 0);

let firstWday = firstDate.getDay();
for (let wdayIndex = 0; wdayIndex < firstWday * 3 - 1; wdayIndex++) {
  process.stdout.write(" ");
}

function format(day, targetDate) {
  if (targetDate.getDay() === 0) {
    return day.toString().padStart(2);
  } else {
    return day.toString().padStart(3);
  }
}

for (let day = 1; day <= lastDate.getDate(); day++) {
  let targetDate = new Date(targetYear, targetMonth - 1, day);
  let formatDay = format(day, targetDate);
  if (targetDate.getDay() === 6) {
    console.log(formatDay);
  } else {
    process.stdout.write(formatDay);
  }
}
console.log();
