import { add } from './helpers';
import { of, from, fromEvent, interval } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { 
  switchMap, 
  filter, 
  take, takeWhile,
  map, tap, pluck, startWith, 
  skipLast, skipWhile 
} from 'rxjs/operators';

// Fetch
const me = {
  name: "Ni Ngo"
}
const ignoreUser = {
  name: "Leanne Graham"
}

const endpoint = 'https://jsonplaceholder.typicode.com/users'
const users = fromFetch(endpoint)
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
const numbers = of(1, 2, 3, 4).subscribe(value => add.li(value, 'display-list-operators'))
const fruits = from(['apple', 'orange', 'grape']).subscribe(value => add.li(value, 'display-list-operators'))

// filter, map
const numbersArr = ["zero", "one", "two", "three", "four"]
const counter = interval(1000)
counter.pipe(take(4), filter(value => value % 2 === 0), map(value => numbersArr[value]))
.subscribe(value => add.li(value, "display-list-operators"))

counter.pipe(take(5), tap(value => add.li(`before x 2: ${value}`, "display-list-operators")), map(value => value * 2), tap(value => add.li(`after x 2: ${value}`, "display-list-operators")))
.subscribe(value => add.li(value, "display-list-operators"))
