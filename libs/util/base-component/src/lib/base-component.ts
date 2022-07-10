import { Directive } from '@angular/core';
import { MonoTypeOperatorFunction, Subject, takeUntil } from 'rxjs';

@Directive()
export class BaseComponent {
  private readonly destroy$: Subject<void> = new Subject<void>();

  finalize(): void {
  }

  takeUntilDestroy<T>(): MonoTypeOperatorFunction<T> {
    return source$ => source$
      .pipe(
        takeUntil(this.destroy$)
      );
  }

  private ngOnDestroy(): void {
    this.destroy$.next();
    this.finalize();
  }
}
