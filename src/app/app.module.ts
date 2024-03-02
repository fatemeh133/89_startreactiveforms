import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomPipePipe } from './custom-pipe.pipe';
import { CutStrPipe } from './cut-str.pipe';

@NgModule({
  declarations: [AppComponent, CustomPipePipe, CutStrPipe],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
