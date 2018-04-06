import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }    from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    MainNavigationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HttpClientModule,
    FormsModule
  ],
})
export class SharedModule { }
