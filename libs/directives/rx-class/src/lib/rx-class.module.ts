import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RxClassDirective } from './rx-class.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [RxClassDirective],
  exports: [RxClassDirective]
})
export class RxClassModule {
}
