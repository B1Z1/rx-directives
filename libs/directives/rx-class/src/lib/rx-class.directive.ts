import { Directive, ElementRef, Input, IterableDiffer, IterableDiffers, OnInit, Renderer2 } from '@angular/core';
import { BaseComponent, tapOnce } from '@rx-directives/util';
import { Observable } from 'rxjs';

@Directive({
  selector: '[rxClass]'
})
export class RxClassDirective extends BaseComponent implements OnInit {
  @Input('rxClass')
  cssClass$!: Observable<Set<string>>;

  private cssClassDiff?: IterableDiffer<string>;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly iterableValueDiffers: IterableDiffers
  ) {
    super();
  }

  ngOnInit(): void {
    this.observeCssClasses();
  }

  private observeCssClasses(): void {
    this.cssClass$
      .pipe(
        tapOnce((cssClass: Set<string>) => {
          this.cssClassDiff = this.iterableValueDiffers.find(cssClass).create();
        }),
        this.takeUntilDestroy()
      )
      .subscribe((cssClass: Set<string>) => {
        if (!this.cssClassDiff) {
          return;
        }

        const diff = this.cssClassDiff.diff(cssClass);

        if (!diff) {
          return;
        }

        diff.forEachAddedItem((cssClass) => {
          this.renderer.addClass(this.elementRef.nativeElement, cssClass.item);
        });

        diff.forEachRemovedItem((cssClass) => {
          this.renderer.removeClass(this.elementRef.nativeElement, cssClass.item);
        });
      });
  }
}
