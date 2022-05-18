import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritPageRoutingModule } from './favourit-routing.module';

import { FavouritPage } from './favourit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritPageRoutingModule
  ],
  declarations: [FavouritPage]
})
export class FavouritPageModule {}
