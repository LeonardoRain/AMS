import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [{ path: 'monitor', component: MonitorComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ApplicationRoutingModule {}
