import { add } from './helpers';
import { interval, range, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

// Interval
const body = document.querySelector('body')
const counter = interval(1000)

counter.subscribe(() => {
  const red = Math.random() * 255
  const green = Math.random() * 255
  const blue = Math.random() * 255

  body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
})

// Range
const numbers = range(0, 10)
numbers
  .pipe(
    concatMap(value => of(value).pipe((delay(200))))
  )
  .subscribe(add.li)