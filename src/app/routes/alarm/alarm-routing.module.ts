import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformManagementComponent } from './inform-management/inform-management.component';
import { OutageDetectionComponent } from './outage-detection/outage-detection.component';
import { ThresholdManagementComponent } from './threshold-management/threshold-management.component';
import { LinkDetectionComponent } from './link-detection/link-detection.component';

const routes: Routes = [
	{ path: 'thresholdManagement', component: ThresholdManagementComponent },
	{ path: 'informManagement', component: InformManagementComponent },
	{ path: 'outageDetection', component: OutageDetectionComponent },
	{ path: 'linkDetection', component: LinkDetectionComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AlarmRoutingModule {}
