import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAnalysisPageRoutingModule } from './edit-analysis-routing.module';

import { EditAnalysisPage } from './edit-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAnalysisPageRoutingModule
  ],
  declarations: [EditAnalysisPage]
})
export class EditAnalysisPageModule {}
