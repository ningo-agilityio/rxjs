import { add } from "./helpers"
import { fromFetch } from 'rxjs/fetch'
import { of, pipe, throwError } from "rxjs"
import { switchMap, mergeMap, concatMap, delay, catchError } from 'rxjs/operators'
import { ajax } from "rxjs/ajax"

// Custom operators
const getJSON = () => {
  return switchMap(response => { return response.json() })
}

const emitEach = (d) => {
  return pipe(
    mergeMap(response => of(...response)),
    concatMap(response => {
      return of(response).pipe(delay(d))
    })
  )
}

// Error handling

const checkStatus = () => {
  return switchMap(
    response => {
      return response.status === 400 ? throwError() : of("Looks good")
    }
  )
}

// Solution 1: fromFetch
const endpoint = "https://jsonplaceholder.typicode.com/users"
const httpContentId = "display-list-http"
fromFetch(endpoint)
.pipe(
  getJSON(),
  emitEach(100)
)
.subscribe(
  (user) => { add.li(user.name, httpContentId) }
)

// Solution 2: ajax
ajax.getJSON(endpoint)
.subscribe(
  response => {
    response.forEach(
      user => add.li(user.name, httpContentId)
    )
  }
)

// Test handling error
fromFetch("https://httpbin.org/status/200")
.pipe(
  checkStatus(),
  catchError(err => of("Oops, error"))
)
.subscribe(
  response => console.log(response),
  err => console.log(err)
)