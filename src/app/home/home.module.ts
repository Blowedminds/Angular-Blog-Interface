import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { HomeRequestService } from './services/home-request.service';
import { HomeService } from './services/home.service';

@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    SharedModule
  ],
  providers: [
    HomeRequestService,
    HomeService
  ]
})
export class HomeModule { }
