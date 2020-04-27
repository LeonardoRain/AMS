import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
	selector: 'app-host-monitor',
	templateUrl: './monitor.component.html',
	styleUrls: ['./monitor.component.less'],
})
export class HostMonitorComponent implements OnInit {
	constructor(private http: _HttpClient, private modal: ModalHelper) {}

	public ngOnInit() {}
}
