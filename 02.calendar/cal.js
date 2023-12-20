import { default as minimist } from 'minimist';

let argv = minimist(process.argv.slice(2));

let first_day = new Date(argv.y,argv.m-1);
let last_day = new Date(argv.y,argv.m,0);

const days_of_week = ['日','月','火','水','木','金','土'];
console.log(days_of_week.join(' '));

//console.log(first_day.toString());
//console.log(last_day.toString());

for ( let day = first_day.getDate(); day <= last_day.getDate(); day++){
  console.log(day);
}
