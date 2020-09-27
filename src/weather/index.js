import { fromEvent, BehaviorSubject, Subject, from, combineLatest } from "rxjs"
import { debounceTime, switchMap, tap, catchError, skip, pluck } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { add } from "../helpers"

const searchBox = document.getElementById("weather-search")
const resultBox = document.getElementById("results-container")
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
const inputData = inputSubject
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

// Handle to get place details
const placeData = resultsEvent
  .pipe(
    switchMap(event => {
      const id = event.target.getAttribute("data")
      return ajax.getJSON(`${endpoint}/place/${id}`)
    })
  )
  .subscribe(
    place => {
      placeSubject.next(place)
    }
  )

const weatherData = placeSubject
  .pipe(
    pluck('geometry', 'location'),
    switchMap(
      (coords) => {
        return ajax.getJSON(`${endpoint}/weather/${coords.lat}/${coords.lng}`)
        .pipe(pluck('current'))
      }
    )
  )

combineLatest(weatherData, placeSubject)
  .subscribe(
    result => {
      const weather = result[0]
      const place = result[1]
      document.getElementById("image-container").innerHTML = ''
      add.div(
        `
        <div class="row">
            <div class="col s12 m6">
              <div class="card pink darken-1">
                <div class="card-content white-text">
                  <span class="card-title">Feels like: ${Math.round(weather.feels_like)}</span>
                  <p>Current conditions: ${weather.weather[0].description}</p>
                </div>
              </div>
            </div>
          </div> 
        `
      )
    }
  )