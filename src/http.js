import { add } from './helpers';
import { Observable } from "rxjs";

const o = new Observable(
  (observer) => {
    setTimeout(() => {
      observer.next('From observable')
      observer.complete()
    }, 100)
  }
)
o.subscribe({
  next: (message) => add.li(message),
  error: (error) => console.log(error),
  complete: () => add.li("This Observable is complete")
})
