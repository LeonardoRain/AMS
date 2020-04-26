import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { DataComponent } from './instance-management/data/data.component';
import { GraphComponent } from './instance-management/graph/graph.component';
import { InstanceManagementComponent } from './instance-management/instance-management.component';
import { PointComponent } from './instance-management/point/point.component';
import { NodeMonitorComponent } from './node-monitor/node-monitor.component';
import { NodeRoutingModule } from './node-routing.module';
import { DataTemComponent } from './template-management/data/data.component';
import { GraphTemComponent } from './template-management/graph/graph.component';
import { PointTemComponent } from './template-management/point/point.component';
import { TemplateManagementComponent } from './template-management/template-management.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
	imports: [
		SharedModule,
		NodeRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		...COMPONENTS,
		...COMPONENTS_NOROUNT,
		NodeMonitorComponent,
		InstanceManagementComponent,
		TemplateManagementComponent,
		DataComponent,
		GraphComponent,
		PointComponent,
		PointTemComponent,
		GraphTemComponent,
		DataTemComponent,
	],
})
export class NodeModule {}
