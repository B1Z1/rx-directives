import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rx-directives-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  exist: boolean = true;

  cssClasses: Set<string> = new Set(['test-1', 'test-2']);
  cssClasses$: BehaviorSubject<Set<string>> = new BehaviorSubject<Set<string>>(this.cssClasses);

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  toggleParagraph() {
    this.exist = !this.exist;
    this.changeDetectorRef.detectChanges();
  }

  addClass(): void {
    this.cssClasses.add(`test-${new Date().toISOString()}`);
    this.cssClasses$.next(this.cssClasses);
  }

  removeClass(): void {
    const cssClass = this.cssClasses.values().next();

    if (cssClass.done) {
      console.log('Empty classes');
      return;
    }

    this.cssClasses.delete(cssClass.value);
    this.cssClasses$.next(this.cssClasses);
  }
}
