import { add } from "./helpers"
import { Subject, Observable } from "rxjs"

const subjectContentId = "display-list-subject"

// Hot

// Cold

const obs = new Observable(
  (sub) => sub.next(new Date())
)

// Used twice
setTimeout(() => {
  obs.subscribe(
    value => add.li(`Observable ${value}: `, subjectContentId)
  )
}, 2004)

setTimeout(() => {
  obs.subscribe(
    value => add.li(`Observable ${value}: `, subjectContentId)
  )
}, 1000)

const sub = new Subject()

setTimeout(() => {
  sub.subscribe(
    value => add.li(`Subject ${value}: `, subjectContentId)
  )
}, 800)

setTimeout(() => {
  sub.subscribe(
    value => add.li(`Subject ${value}: `, subjectContentId)
  )
}, 1000)

setTimeout(() => {
  sub.next(new Date())
}, 1002)