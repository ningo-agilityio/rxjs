import { add } from './helpers';
import { of, from, fromEvent, interval } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, filter, take, map } from 'rxjs/operators';

// Fetch
const endpoint = 'https://jsonplaceholder.typicode.com/users'
const users = fromFetch(endpoint)
.pipe(switchMap((response) => response.json()))
.subscribe((result) => result.forEach(
  user => add.li(user.name)
))

// Event
const btnSubmit = document.getElementById('btnSubmit')
fromEvent(btnSubmit, 'click').subscribe(() => add.li('clicked', 'display-list-operators'))

// Simple
const numbers = of(1, 2, 3, 4).subscribe(value => add.li(value, 'display-list-operators'))
const fruits = from(['apple', 'orange', 'grape']).subscribe(value => add.li(value, 'display-list-operators'))

// filter, map
const numbersArr = ["zero", "one", "two", "three", "four"]
const counter = interval(1000).pipe(take(4))
counter.pipe(filter(value => value % 2 === 0), map(value => numbersArr[value]))
.subscribe(value => add.li(value, "display-list-operators"))