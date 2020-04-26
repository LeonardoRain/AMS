import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostMonitorComponent } from './monitor/monitor.component';

const routes: Routes = [{ path: 'monitor', component: HostMonitorComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HostRoutingModule {}
