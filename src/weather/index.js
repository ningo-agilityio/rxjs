import { fromEvent, BehaviorSubject, Subject, from } from "rxjs"
import { debounceTime, switchMap, tap, catchError, skip } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { add } from "../helpers"

const searchBox = document.getElementById("weather-search")
const resultBox = document.getElementById("weather-result")
const spinner = document.getElementById("spinner")

// Event handlers
const searchEvent = fromEvent(searchBox, 'keyup')
const resultsEvent = fromEvent(resultBox, 'click')

// Subjects
const inputSubject = new BehaviorSubject('')
const placeSubject = new Subject()
const weatherSubject = new Subject()

// Turn on spinner when user is typing
const endpoint = "http://localhost:3000"
inputSubject
.pipe(
  skip(1),
  tap(() => { spinner.className = 'spinner' }),
  debounceTime(1000),
  switchMap(keyword => {
    return ajax
      .getJSON(`${endpoint}/autocomplete/${keyword}`)
      .pipe(
        tap(() => {
          spinner.className = ''
        }),
        catchError(() => { spinner.className = '' }),
        switchMap(result => from(result)),
      )
  })
)
.subscribe(result => { add.result(result.description, result.place_id)})

searchEvent
  .subscribe(event => { inputSubject.next(searchBox.value) })