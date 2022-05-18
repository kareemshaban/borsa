import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAnalysisPageRoutingModule } from './add-analysis-routing.module';

import { AddAnalysisPage } from './add-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAnalysisPageRoutingModule
  ],
  declarations: [AddAnalysisPage]
})
export class AddAnalysisPageModule {}
