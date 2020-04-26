import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
	selector: 'app-host-monitor',
	templateUrl: './monitor.component.html',
})
export class HostMonitorComponent implements OnInit {
	public url = `/user`;
	public searchSchema: SFSchema = {
		properties: {
			no: {
				type: 'string',
				title: '编号',
			},
		},
	};
	@ViewChild('st', { static: false }) public st: STComponent;
	public columns: STColumn[] = [
		{ title: '编号', index: 'no' },
		{ title: '调用次数', type: 'number', index: 'callNo' },
		{ title: '头像', type: 'img', width: '50px', index: 'avatar' },
		{ title: '时间', type: 'date', index: 'updatedAt' },
		{
			title: '',
			buttons: [
				// { text: '查看', click: (item: any) => `/form/${item.id}` },
				// { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
			],
		},
	];

	constructor(private http: _HttpClient, private modal: ModalHelper) {}

	// tslint:disable-next-line: member-access
	ngOnInit() {}

	public add() {
		// this.modal
		//   .createStatic(FormEditComponent, { i: { id: 0 } })
		//   .subscribe(() => this.st.reload());
	}
}
