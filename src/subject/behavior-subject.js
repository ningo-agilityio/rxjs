import { add } from "../helpers"
import { BehaviorSubject, interval } from "rxjs"
import { take } from "rxjs/operators"

const numbers = new BehaviorSubject(10)
const subjectContentId = "display-list-subject"

interval(500)
.subscribe((value) => { numbers.next(value) })

numbers.pipe(take(10)).subscribe(value => add.li(value, subjectContentId))
numbers.pipe(take(5)).subscribe(value => add.li(`Second value: ${value}`, subjectContentId))