import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRecommendationPageRoutingModule } from './edit-recommendation-routing.module';

import { EditRecommendationPage } from './edit-recommendation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRecommendationPageRoutingModule
  ],
  declarations: [EditRecommendationPage]
})
export class EditRecommendationPageModule {}
