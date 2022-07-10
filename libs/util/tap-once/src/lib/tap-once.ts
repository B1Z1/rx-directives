import { MonoTypeOperatorFunction, Observable, tap } from 'rxjs';

export function tapOnce<T>(callback: (value: T) => void): MonoTypeOperatorFunction<T> {
  let isFirst = true;

  return (source$: Observable<T>) => source$.pipe(
    tap((value: T) => {
      if (isFirst) {
        callback(value);
        isFirst = false;
      }
    })
  )
}
