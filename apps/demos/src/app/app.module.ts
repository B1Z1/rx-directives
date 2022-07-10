import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RxClassModule } from '@rx-directives/directives';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RxClassModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
