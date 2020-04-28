import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';

// tslint:disable-next-line: interface-name
interface HostData {
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
	public settingForm: FormGroup;
	public listOfData: HostData[] = [];
	public DataNum: string;
	public displayData: HostData[] = [];
	public allChecked = false;
	public indeterminate = false;
	public fixedColumn = false;
	public scrollX: string | null = null;
	public scrollY: string | null = null;
	public settingValue: Setting;
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
				hostName: 'crazy-host [172.16.22.207]',
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

	// 启动主机监控确认模态框
	public showStartConfirm(): void {
		this.modal.confirm({
			nzTitle: '<b>操作确认</b>',
			nzContent: '<b>确定启用该主机的监控?</b>',
			nzOkText: '确定',
			nzOnOk: () => console.log('启用监控主机列表成功。'),
			nzCancelText: '取消',
			nzOnCancel: () => console.log('StartConfirmCancel'),
		});
	}

	// 暂停主机监控确认模态框
	public showPauseConfirm(): void {
		this.modal.confirm({
			nzTitle: '<b>操作确认</b>',
			nzContent: '<b>确定停止该主机的监控?</b>',
			nzOkText: '确定',
			nzOkType: 'danger',
			nzOnOk: () => console.log('停止监控主机列表成功。'),
			nzCancelText: '取消',
			nzOnCancel: () => console.log('PauseConfirmCancel'),
		});
	}

	constructor(
		private formBuilder: FormBuilder,
		private modal: NzModalService
	) {}

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
