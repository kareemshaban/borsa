import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritPage } from './favourit.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritPageRoutingModule {}
