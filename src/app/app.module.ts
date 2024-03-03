import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CustomPipePipe } from './custom-pipe.pipe';
import { CutStrPipe } from './cut-str.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, CustomPipePipe, CutStrPipe, FilterPipe],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
