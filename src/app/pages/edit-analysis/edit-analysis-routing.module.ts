import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAnalysisPage } from './edit-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: EditAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAnalysisPageRoutingModule {}
