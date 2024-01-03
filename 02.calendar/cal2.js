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

let days = [];

for (let day = firstDate.getDate(); day <= lastDate.getDate(); day++) {
  days.push(day.toString().padStart(2));
}

let firstWday = firstDate.getDay();
let weeks = [];

for (let weekIndex = 1; weekIndex <= 6; weekIndex++) {
  if (weekIndex === 1) {
    weeks.push(days.slice(0, 7 * weekIndex - firstWday));
  } else {
    weeks.push(
      days.slice(7 * (weekIndex - 1) - firstWday, 7 * weekIndex - firstWday),
    );
  }
}

for (let week of weeks) {
  if (week === weeks[0]) {
    console.log(week.join(" ").padStart(20));
  } else {
    console.log(week.join(" "));
  }
}
