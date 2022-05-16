import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent,} from './app.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    EditPersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
