import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritHomePageRoutingModule } from './favourit-home-routing.module';

import { FavouritHomePage } from './favourit-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritHomePageRoutingModule
  ],
  declarations: [FavouritHomePage]
})
export class FavouritHomePageModule {}
