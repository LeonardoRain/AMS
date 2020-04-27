import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { HostRoutingModule } from './host-routing.module';
import { HostMonitorComponent } from './monitor/monitor.component';
import { HostListComponent } from './monitor/host-list/host-list.component';

const COMPONENTS = [HostMonitorComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
	imports: [SharedModule, HostRoutingModule],
	declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT, HostListComponent],
})
export class HostModule {}
