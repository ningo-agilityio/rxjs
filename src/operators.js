import { add } from './helpers';
import { of, from, fromEvent } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

// Fetch
const endpoint = 'https://jsonplaceholder.typicode.com/users'
const users = fromFetch(endpoint)
.pipe(switchMap((response) => response.json()))
.subscribe((result) => result.forEach(
  user => add.li(user.name)
))

// Event
const btnSubmit = document.getElementById('btnSubmit')
fromEvent(btnSubmit, 'click').subscribe(() => add.li('clicked'))

// Simple
const numbers = of(1, 2, 3, 4).subscribe(add.li)
const fruits = from(['apple', 'orange', 'grape']).subscribe(add.li)