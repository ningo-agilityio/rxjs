import { add } from './helpers';
import { Observable } from "rxjs";

const o = new Observable(
  (observer) => {
    setTimeout(() => {
      observer.next('From observable', 'display-list-observable')
      observer.complete()
    }, 100)
  }
)

o.subscribe({
  next: (message) => add.li(message, 'display-list-observable'),
  error: (error) => console.log(error),
  complete: () => add.li("This Observable is complete", 'display-list-observable')
})
