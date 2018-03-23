import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }    from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';

import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    MainNavigationComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    // NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    // BrowserModule,
    // NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
