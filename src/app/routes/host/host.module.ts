import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HostRoutingModule } from './host-routing.module';
import { ModalConfirmComponent } from './monitor/components/modal-confirm/modal-confirm.component';
import { HostListComponent } from './monitor/host-list/host-list.component';
import { HostMonitorComponent } from './monitor/monitor.component';

const COMPONENTS = [HostMonitorComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
	imports: [
		SharedModule,
		HostRoutingModule,
		NzButtonModule,
		NzIconModule,
		NzInputModule,
		NzNotificationModule,
		NzModalModule,
		NzSelectModule,
	],
	declarations: [
		...COMPONENTS,
		...COMPONENTS_NOROUNT,
		HostListComponent,
		ModalConfirmComponent,
	],
})
export class HostModule {}
