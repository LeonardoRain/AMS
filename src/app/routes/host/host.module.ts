import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HostRoutingModule } from './host-routing.module';
import { SelectAreaComponent } from './monitor/components/select-area/select-area.component';
import { HostListComponent } from './monitor/host-list/host-list.component';
import { HostMonitorComponent } from './monitor/monitor.component';
import { ModalConfirmComponent } from './monitor/components/modal-confirm/modal-confirm.component';

const COMPONENTS = [HostMonitorComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
	imports: [
		SharedModule,
		HostRoutingModule,
		NzButtonModule,
		NzIconModule,
		NzInputModule,
	],
	declarations: [
		...COMPONENTS,
		...COMPONENTS_NOROUNT,
		HostListComponent,
		SelectAreaComponent,
		ModalConfirmComponent,
	],
})
export class HostModule {}
