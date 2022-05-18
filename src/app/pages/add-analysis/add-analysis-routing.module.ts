import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAnalysisPage } from './add-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: AddAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAnalysisPageRoutingModule {}
