import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ApplicationRoutingModule } from './application-routing.module';
import { MonitorComponent } from './monitor/monitor.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ApplicationRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    MonitorComponent
  ],
})
export class ApplicationModule { }
