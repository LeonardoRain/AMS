import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AlarmRoutingModule } from './alarm-routing.module';
import { ThresholdManagementComponent } from './threshold-management/threshold-management.component';
import { InformManagementComponent } from './inform-management/inform-management.component';
import { OutageDetectionComponent } from './outage-detection/outage-detection.component';
import { LinkDetectionComponent } from './link-detection/link-detection.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    AlarmRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ThresholdManagementComponent,
    InformManagementComponent,
    OutageDetectionComponent,
    LinkDetectionComponent
  ],
})
export class AlarmModule { }
