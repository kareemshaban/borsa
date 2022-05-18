import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRecommendationPage } from './edit-recommendation.page';

const routes: Routes = [
  {
    path: '',
    component: EditRecommendationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRecommendationPageRoutingModule {}
