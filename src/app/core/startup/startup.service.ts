import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import {
	ALAIN_I18N_TOKEN,
	MenuService,
	SettingsService,
	TitleService,
} from '@delon/theme';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
	constructor(
		iconSrv: NzIconService,
		private menuService: MenuService,
		private settingService: SettingsService,
		private aclService: ACLService,
		private titleService: TitleService,
		@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
		private httpClient: HttpClient,
		private injector: Injector
	) {
		iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
	}

	private viaHttp(resolve: any, reject: any) {
		zip(this.httpClient.get('assets/tmp/app-data.json'))
			.pipe(
				catchError(([appData]) => {
					resolve(null);
					return [appData];
				})
			)
			.subscribe(
				([appData]) => {
					// Application data
					const res: any = appData;
					// Application information: including site name, description, year
					this.settingService.setApp(res.app);
					// User information: including name, avatar, email address
					this.settingService.setUser(res.user);
					// ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
					this.aclService.setFull(true);
					// Menu data, https://ng-alain.com/theme/menu
					this.menuService.add(res.menu);
					// Can be set page suffix title, https://ng-alain.com/theme/title
					this.titleService.suffix = res.app.name;
				},
				() => {},
				() => {
					resolve(null);
				}
			);
	}

	private viaMock(resolve: any, reject: any) {
		// const tokenData = this.tokenService.get();
		// if (!tokenData.token) {
		//   this.injector.get(Router).navigateByUrl('/passport/login');
		//   resolve({});
		//   return;
		// }
		// mock
		const app: any = {
			name: `AMS`,
			description: `对基础设施及产品的监控和运维管理`,
		};
		const user: any = {
			name: 'Admin',
			avatar: './assets/tmp/img/avatar.jpg',
			email: 'Rain@qq.com',
			token: '123456789',
		};
		// Application information: including site name, description, year
		this.settingService.setApp(app);
		// User information: including name, avatar, email address
		this.settingService.setUser(user);
		// ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
		this.aclService.setFull(true);
		// Menu data, https://ng-alain.com/theme/menu
		this.menuService.add([
			{
				group: false,
				text: '主页',
				children: [
					{
						text: '主机',
						icon: { type: 'icon', value: 'desktop' },
						children: [
							{
								text: '主机监控',
								link: '/host/monitor',
							},
						],
					},
					{
						text: '应用',
						icon: { type: 'icon', value: 'appstore' },
						children: [
							{
								text: '应用监控',
								link: '/application/monitor',
							},
						],
					},
					{
						text: '节点',
						icon: { type: 'icon', value: 'apartment' },
						children: [
							{
								text: '节点监视',
								link: '/node/monitor',
							},
							{
								text: '实例管理',
								children: [
									{
										text: '节点',
										link: '/node/instanceManagement/point',
									},
									{
										text: '图形',
										link: '/node/instanceManagement/graph',
									},
									{
										text: '数据',
										link: '/node/instanceManagement/data',
									},
								],
							},
							{
								text: '模板管理',
								children: [
									{
										text: '节点',
										link: '/node/templateManagement/point',
									},
									{
										text: '图形',
										link: '/node/templateManagement/graph',
									},
									{
										text: '数据',
										link: '/node/templateManagement/data',
									},
								],
							},
						],
					},
					{
						text: '告警',
						icon: { type: 'icon', value: 'bell' },
						children: [
							{
								text: '阈值管理',
								link: '/alarm/thresholdManagement',
							},
							{
								text: '通知管理',
								link: '/alarm/informManagement',
							},
							{
								text: '宕机检测',
								link: '/alarm/outageDetection',
							},
							{
								text: '链路检测',
								link: '/alarm/linkDetection',
							},
						],
					},
				],
			},
		]);
		// Can be set page suffix title, https://ng-alain.com/theme/title
		this.titleService.suffix = app.name;

		resolve({});
	}

	public load(): Promise<any> {
		// only works with promises
		// https://github.com/angular/angular/issues/15088
		return new Promise((resolve, reject) => {
			// http
			// this.viaHttp(resolve, reject);
			// mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
			this.viaMock(resolve, reject);
		});
	}
}
