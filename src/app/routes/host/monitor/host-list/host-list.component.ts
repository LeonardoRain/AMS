import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

// tslint:disable-next-line: interface-name
interface HostData {
	id: number; // 主机id
	hostName: string; // 主机名称
	agentVersion: number | string; // Agent版本
	tag: string; // 标签
	belongArea: string; // 所属区域
	cpuUsage: string; // CPU使用
	ramUsage: string; // 内存使用
	runningState: string; // 运行状态
	monitorState: string; // 监控状态
	belongService: string; // 所属服务
	checked: boolean;
	disabled?: boolean;
}

// tslint:disable-next-line: interface-name
interface Setting {
	bordered: boolean;
	loading: boolean;
	pagination: boolean;
	sizeChanger: boolean;
	title: boolean;
	header: boolean;
	footer: boolean;
	expandable: boolean;
	checkbox: boolean;
	fixHeader: boolean;
	noResult: boolean;
	ellipsis: boolean;
	simple: boolean;
	size: string;
	tableScroll: string;
	tableLayout: string;
	position: string;
}

@Component({
	selector: 'app-host-list',
	templateUrl: './host-list.component.html',
	styleUrls: ['./host-list.component.css'],
})
export class HostListComponent implements OnInit {
	constructor(
		private formBuilder: FormBuilder,
		private modal: NzModalService,
		private notification: NzNotificationService
	) {}

	public settingForm: FormGroup;
	public DataNum: string;
	public listOfData: HostData[] = [];
	public displayData: HostData[] = [];
	public choosedHostId: number[] = []; // 被选中的 hostId 数组
	public allChecked = false;
	public indeterminate = false;
	public fixedColumn = false;
	public scrollX: string | null = null;
	public scrollY: string | null = null;
	public settingValue: Setting;
	public isVisible = false;
	public inputTag: string;
	public selectedItem: any; // 选中的 所属区域
	// inputQuery = iQ
	public iQBelongArea: string; // 输入查询所属区域
	public iQHostName: string; // 输入查询主机名称
	public iQAgentVersion: number | string; // 输入查询Agent版本
	public iQTag: string; // 输入查询标签
	// 所属区域信息
	public optionList = [
		{ label: '全部', value: '全部', id: 0 },
		{ label: 'Ams', value: 'Ams', id: 1 },
		{ label: 'JP-COMPUTER', value: 'JP-COMPUTER', id: 2 },
		{ label: '公司内网', value: '公司内网', id: 3 },
		{ label: '44机器', value: '44机器', id: 4 },
		{ label: '运维平台应用', value: '运维平台应用', id: 5 },
	];
	public listOfSwitch = [
		{ name: 'Bordered', formControlName: 'bordered' },
		{ name: 'Loading', formControlName: 'loading' },
		{ name: 'Pagination', formControlName: 'pagination' },
		{ name: 'PageSizeChanger', formControlName: 'sizeChanger' },
		{ name: 'Title', formControlName: 'title' },
		{ name: 'Column Header', formControlName: 'header' },
		{ name: 'Footer', formControlName: 'footer' },
		{ name: 'Expandable', formControlName: 'expandable' },
		{ name: 'Checkbox', formControlName: 'checkbox' },
		{ name: 'Fixed Header', formControlName: 'fixHeader' },
		{ name: 'No Result', formControlName: 'noResult' },
		{ name: 'Ellipsis', formControlName: 'ellipsis' },
		{ name: 'Simple Pagination', formControlName: 'simple' },
	];
	public listOfRadio = [
		{
			name: 'Size',
			formControlName: 'size',
			listOfOption: [
				{ value: 'default', label: 'Default' },
				{ value: 'middle', label: 'Middle' },
				{ value: 'small', label: 'Small' },
			],
		},
		{
			name: 'Table Scroll',
			formControlName: 'tableScroll',
			listOfOption: [
				{ value: 'unset', label: 'Unset' },
				{ value: 'scroll', label: 'Scroll' },
				{ value: 'fixed', label: 'Fixed' },
			],
		},
		{
			name: 'Table Layout',
			formControlName: 'tableLayout',
			listOfOption: [
				{ value: 'auto', label: 'Auto' },
				{ value: 'fixed', label: 'Fixed' },
			],
		},
		{
			name: 'Pagination Position',
			formControlName: 'position',
			listOfOption: [
				{ value: 'top', label: 'Top' },
				{ value: 'bottom', label: 'Bottom' },
				{ value: 'both', label: 'Both' },
			],
		},
	];

	public compareFn = (o1: any, o2: any) =>
		// tslint:disable-next-line: semicolon
		o1 && o2 ? o1.value === o2.value : o1 === o2;

	public selectedChange(Item: {
		label: string;
		value?: string;
		id: number;
	}): void {
		if (Item !== null) {
			// console.log(Item.value);
			this.iQBelongArea = Item.value;
		}
	}

	public currentPageDataChange($event: HostData[]): void {
		this.displayData = $event;
		this.refreshStatus();
	}

	public refreshStatus(): void {
		const validData = this.displayData.filter(value => !value.disabled);
		const allChecked =
			validData.length > 0 &&
			validData.every(value => value.checked === true);
		const allUnChecked = validData.every(value => !value.checked);
		this.allChecked = allChecked;
		this.indeterminate = !allChecked && !allUnChecked;
	}

	public checkAll(value: boolean): void {
		this.displayData.forEach(data => {
			if (!data.disabled) {
				data.checked = value;
			}
		});
		this.refreshStatus();
	}

	public generateData(): HostData[] {
		const data = [];
		for (let i = 1; i <= 100; i++) {
			const randomCpuUse = (Math.random() * 100).toFixed(2);
			const randomRamNum = (Math.random() * 100).toFixed(2);
			data.push({
				id: i,
				hostName: `crazy-host ${i} [172.16.22.207]`,
				agentVersion: '5.0.0',
				tag: 'host',
				belongArea: '运维平台应用',
				cpuUsage: `${randomCpuUse}%`,
				ramUsage: `${randomRamNum}%`,
				runningState: '正常',
				monitorState: '监控中',
				belongService: `server${i}`,
				checked: false,
				expand: false,
			});
		}
		return data;
	}

	// 标签设置模态框 处理函数
	public showTagModal(): void {
		this.getChoosedHostId();
		if (this.choosedHostId.length === 0) {
			this.createNotification('warning', '请选择主机！');
		} else {
			this.isVisible = true;
		}
	}

	public handleTagOk(): void {
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < this.choosedHostId.length; i++) {
			// tslint:disable-next-line: prefer-const
			let id = this.choosedHostId[i];
			this.listOfData[id - 1].tag = this.inputTag;
			this.listOfData[id - 1].checked = false;
		}
		this.allChecked = false;
		this.indeterminate = false;
		this.choosedHostId = [];
		this.inputTag = '';
		this.isVisible = false;
	}

	public handleTagCancel(): void {
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < this.choosedHostId.length; i++) {
			// tslint:disable-next-line: prefer-const
			let id = this.choosedHostId[i];
			this.listOfData[id - 1].checked = false;
		}
		this.allChecked = false;
		this.indeterminate = false;
		this.choosedHostId = [];
		this.inputTag = '';
		this.isVisible = false;
	}

	// 启动单个主机监控确认模态框
	public showStartConfirm(hostId: number): void {
		this.modal.confirm({
			nzTitle: '<b>操作确认</b>',
			nzContent: '<b>确定启用该主机的监控?</b>',
			nzOkText: '确定',
			nzOnOk: () => {
				// console.log('启用监控单个主机列表成功，监控主机id：' + hostId);
				this.listOfData[hostId - 1].runningState = '正常';
				this.listOfData[hostId - 1].monitorState = '监控中';
			},
			nzCancelText: '取消',
			// nzOnCancel: () => console.log('StartConfirmCancel'),
		});
	}

	// 暂停单个主机监控确认模态框
	public showPauseConfirm(hostId: number): void {
		this.modal.confirm({
			nzTitle: '<b>操作确认</b>',
			nzContent: '<b>确定停止该主机的监控?</b>',
			nzOkText: '确定',
			nzOkType: 'danger',
			nzOnOk: () => {
				// console.log('暂停监控单个主机列表成功，监控主机id：' + hostId);
				this.listOfData[hostId - 1].runningState = '--';
				this.listOfData[hostId - 1].monitorState = '已暂停';
			},
			nzCancelText: '取消',
			// nzOnCancel: () => console.log('PauseConfirmCancel'),
		});
	}

	public getChoosedHostId() {
		// tslint:disable-next-line: prefer-for-of
		for (let i = 0; i < this.listOfData.length; i++) {
			if (this.listOfData[i].checked === true) {
				this.choosedHostId.push(this.listOfData[i].id);
			}
		}
	}

	// 启动所选主机监控确认模态框
	public showChoosedStartConfirm(): void {
		this.getChoosedHostId();
		if (this.choosedHostId.length === 0) {
			this.createNotification('warning', '请选择主机！');
		} else {
			this.modal.confirm({
				nzTitle: '<b>操作确认</b>',
				nzContent: '<b>确定启用所选主机的监控?</b>',
				nzOkText: '确定',
				nzOnOk: () => {
					// tslint:disable-next-line: prefer-for-of
					for (let i = 0; i < this.choosedHostId.length; i++) {
						// tslint:disable-next-line: prefer-const
						let id = this.choosedHostId[i];
						// console.log(
						// 	'启用监控所选主机列表成功，监控主机id：' + id
						// );
						this.listOfData[id].runningState = '正常';
						this.listOfData[id].monitorState = '监控中';
						this.listOfData[id - 1].checked = false;
					}
					this.createNotification('success', '启用监控主机列表成功');
					this.allChecked = false;
					this.indeterminate = false;
					this.choosedHostId = [];
				},
				nzCancelText: '取消',
				// nzOnCancel: () => console.log('StartConfirmCancel'),
			});
		}
	}

	// 暂停所选主机监控确认模态框
	public showChoosedPauseConfirm(): void {
		this.getChoosedHostId();
		if (this.choosedHostId.length === 0) {
			this.createNotification('warning', '请选择主机！');
		} else {
			this.modal.confirm({
				nzTitle: '<b>操作确认</b>',
				nzContent: '<b>确定停止所选主机的监控?</b>',
				nzOkText: '确定',
				nzOnOk: () => {
					// tslint:disable-next-line: prefer-for-of
					for (let i = 0; i < this.choosedHostId.length; i++) {
						// tslint:disable-next-line: prefer-const
						let id = this.choosedHostId[i];
						// console.log(
						// 	'暂停监控所选主机列表成功，监控主机id：' + id
						// );
						this.listOfData[id].runningState = '--';
						this.listOfData[id].monitorState = '已暂停';
						this.listOfData[id - 1].checked = false;
					}
					this.createNotification('success', '停止监控主机列表成功');
					this.allChecked = false;
					this.indeterminate = false;
					this.choosedHostId = [];
				},
				nzCancelText: '取消',
				// nzOnCancel: () => console.log('PauseConfirmCancel'),
			});
		}
	}

	// 通知提醒框 创建函数：
	// (两个参数，分别为通知类型 【'success' | 'info' | 'warning' | 'error'】和 通知标题，通知描述暂时为空)
	public createNotification(type: string, title: string): void {
		this.notification.create(type, title, ' ');
	}

	// 列表的模糊查询
	public fuzzyQuery() {
		console.log(
			`FuzzyQuery:
			所属区域：${this.iQBelongArea}
			版本：${this.iQAgentVersion}
			标签：${this.iQTag}
			主机名称：${this.iQHostName}`
		);
	}

	// 清除查询条件
	public clearFuzzyQuery() {
		this.selectedItem = '';
		this.iQBelongArea = '';
		this.iQAgentVersion = '';
		this.iQTag = '';
		this.iQHostName = '';
	}

	public ngOnInit(): void {
		this.settingForm = this.formBuilder.group({
			bordered: false,
			loading: false,
			pagination: true,
			sizeChanger: true,
			title: false,
			header: true,
			footer: true,
			expandable: false,
			checkbox: true,
			fixHeader: false,
			noResult: false,
			ellipsis: false,
			simple: false,
			size: 'small',
			tableScroll: 'unset',
			tableLayout: 'auto',
			position: 'bottom',
		});
		this.settingValue = this.settingForm.value;
		this.settingForm.valueChanges.subscribe(
			value => (this.settingValue = value)
		);
		// tslint:disable-next-line: no-non-null-assertion
		this.settingForm.get('tableScroll')!.valueChanges.subscribe(scroll => {
			this.fixedColumn = scroll === 'fixed';
			this.scrollX =
				scroll === 'scroll' || scroll === 'fixed' ? '100vw' : null;
		});
		// tslint:disable-next-line: no-non-null-assertion
		this.settingForm.get('fixHeader')!.valueChanges.subscribe(fixed => {
			this.scrollY = fixed ? '240px' : null;
		});
		// tslint:disable-next-line: no-non-null-assertion
		this.settingForm.get('noResult')!.valueChanges.subscribe(empty => {
			if (empty) {
				this.listOfData = [];
			} else {
				this.listOfData = this.generateData();
			}
		});
		this.listOfData = this.generateData();
		this.DataNum = '合计共 ' + this.listOfData.length + ' 条记录';
	}
}
