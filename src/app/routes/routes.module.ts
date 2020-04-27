import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
// single pages
import { CallbackComponent } from './callback/callback.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS = [
	DashboardComponent,
	// passport pages
	UserLoginComponent,
	UserRegisterComponent,
	UserRegisterResultComponent,
	// single pages
	CallbackComponent,
	UserLockComponent,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
	imports: [SharedModule, RouteRoutingModule, NzIconModule, NzButtonModule],
	declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
})
export class RoutesModule {}
