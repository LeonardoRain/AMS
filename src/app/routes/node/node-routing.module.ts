import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './instance-management/data/data.component';
import { GraphComponent } from './instance-management/graph/graph.component';
import { InstanceManagementComponent } from './instance-management/instance-management.component';
import { PointComponent } from './instance-management/point/point.component';
import { NodeMonitorComponent } from './node-monitor/node-monitor.component';
import { DataTemComponent } from './template-management/data/data.component';
import { GraphTemComponent } from './template-management/graph/graph.component';
import { PointTemComponent } from './template-management/point/point.component';
import { TemplateManagementComponent } from './template-management/template-management.component';

const routes: Routes = [
	{ path: 'monitor', component: NodeMonitorComponent },
	{
		path: 'instanceManagement',
		children: [
			{
				path: 'point',
				component: PointComponent,
			},
			{
				path: 'graph',
				component: GraphComponent,
			},
			{
				path: 'data',
				component: DataComponent,
			},
		],
	},
	{
		path: 'templateManagement',
		children: [
			{
				path: 'point',
				component: PointTemComponent,
			},
			{
				path: 'graph',
				component: GraphTemComponent,
			},
			{
				path: 'data',
				component: DataTemComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NodeRoutingModule {}
