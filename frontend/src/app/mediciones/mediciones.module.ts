import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicionesPageRoutingModule } from './mediciones-routing.module';
import { MedicionesPage } from './mediciones.page';
import { CustomPipe } from '../pipes/custom.pipe';
import { ResaltarDirective} from '../directives/resaltar.directive'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicionesPageRoutingModule
  ],
  declarations: [MedicionesPage, CustomPipe, ResaltarDirective]
})
export class MedicionesPageModule {}
