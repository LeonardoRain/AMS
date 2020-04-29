import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-select-area',
	templateUrl: './select-area.component.html',
	styleUrls: ['./select-area.component.css'],
})
export class SelectAreaComponent {
	// @Output() public selectArea = new EventEmitter<string>();
	public optionList = [
		{ label: '全部', value: '全部', id: 0 },
		{ label: 'Ams', value: 'Ams', id: 1 },
		{ label: 'JP-COMPUTER', value: 'JP-COMPUTER', id: 2 },
		{ label: '公司内网', value: '公司内网', id: 3 },
		{ label: '44机器', value: '44机器', id: 4 },
		{ label: '运维平台应用', value: '运维平台应用', id: 5 },
	];
	// 所选区域
	public selectedItem: any;
	// tslint:disable-next-line:no-any
	public compareFn = (o1: any, o2: any) =>
		// tslint:disable-next-line: semicolon
		o1 && o2 ? o1.value === o2.value : o1 === o2;
	public selectedChange(Item: {
		label: string;
		value: string;
		id: number;
	}): void {
		// console.log(Item.value);
		console.log(this.selectedItem.value);
		// this.selectedItem = Item;
		// this.selectArea.emit(Item.value);
	}
}
