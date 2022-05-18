import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritHomePage } from './favourit-home.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritHomePageRoutingModule {}
