import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { DataFetchService } from './data-fetch.service';
import { YourState } from './state/my.state';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    NgxsModule.forRoot([YourState]),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AppComponent
  ],
  providers: [DataFetchService]
})
export class AppModule {}