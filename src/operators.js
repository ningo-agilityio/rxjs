import { add } from './helpers';
import { of, from, fromEvent, interval, timer, combineLatest } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { 
  switchMap, 
  filter, 
  take, takeWhile,
  map, tap, pluck, startWith, 
  skipLast, skipWhile,
  throttle, 
  debounceTime,
  scan,
  reduce
} from 'rxjs/operators';

// Fetch
const me = {
  name: "Ni Ngo"
}
const ignoreUser = {
  name: "Leanne Graham"
}

const endpoint = 'https://jsonplaceholder.typicode.com/users'
fromFetch(endpoint)
.pipe(switchMap((response) => response.json()))
.subscribe((result) => from(result).
  pipe(
    takeWhile((value, index) => index < 10),
    skipWhile(value => value.name === ignoreUser.name), 
    startWith(me), 
    skipLast(5), 
    pluck("name"),
  )
  .subscribe(value => add.li(value, 'display-list-operators')) 
)

// Event
const btnSubmit = document.getElementById('btnSubmit')
fromEvent(btnSubmit, 'click').subscribe(() => add.li('clicked', 'display-list-operators'))

// Simple
of(1, 2, 3, 4).subscribe(value => add.li(value, 'display-list-operators'))
from(['apple', 'orange', 'grape']).subscribe(value => add.li(value, 'display-list-operators'))

// filter, map
const numbersArr = ["zero", "one", "two", "three", "four"]
const counter = interval(1000)
counter.pipe(take(4), filter(value => value % 2 === 0), map(value => numbersArr[value]))
.subscribe(value => add.li(value, "display-list-operators"))

counter.pipe(take(5), tap(value => add.li(`before x 2: ${value}`, "display-list-operators")), map(value => value * 2), tap(value => add.li(`after x 2: ${value}`, "display-list-operators")))
.subscribe(value => add.li(value, "display-list-operators"))

// Throttle
interval(10)
.pipe(throttle(() => interval(1000)), take(10))
.subscribe(value => add.li(value, "display-list-throttle"))

// Debounce
const textBox = document.getElementById("input-debounce")
const renderBox = document.getElementById("display-content-debounce")
const btnSubmitDebounce = document.getElementById("btn-debounce")

const content = fromEvent(textBox, 'keyup')
const submitEvent = fromEvent(btnSubmitDebounce, 'click')
content
.pipe(debounceTime(500))
.subscribe(() => {
  renderBox.innerHTML = textBox.value
})

// Scan
interval(100)
.pipe(
  take(5),
  scan(
    (arr, value) => {
      const n = value + 1
      const last = arr[n]
      const beforeLast = arr[n-1]

      return [...arr, last + beforeLast]
    },
    [0, 1]
  )
)
.subscribe(value => add.li(value, "display-list-scan"))

// Reduce
interval(100)
.pipe(
  take(5),
  reduce(
    (arr, value) => {
      const n = value + 1
      const last = arr[n]
      const beforeLast = arr[n-1]

      return [...arr, last + beforeLast]
    },
    [0, 1]
  )
)
.subscribe(value => add.li(value, "display-list-reduce"))

// Combine latest
combineLatest(
  timer(1, 4), // timerOne emits first value at 1s, then once every 4s
  timer(2, 4), // timerTwo emits first value at 2s, then once every 4s
  timer(3, 4), // timerThree emits first value at 3s, then once every 4s
  // combineLatest also takes an optional projection function
  (one, two, three) => {
    return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`;
  }
)
// .subscribe(value => add.li(value, "display-list-combine-latest"))

