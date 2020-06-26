import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {ChatModule} from '././chat/chat.module';
import { OpleidingenComponent } from './opleidingen/opleidingen.component'; 



@NgModule({
  declarations: [
    AppComponent,
    OpleidingenComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
