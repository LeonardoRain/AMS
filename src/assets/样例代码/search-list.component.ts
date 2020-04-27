import { Component } from '@angular/core';

@Component({
	selector: 'app-search-list',
	templateUrl: './search-list.component.html',
	styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent {
	public searchValue = '';
	public sortName: string | null = null;
	public sortValue: string | null = null;
	public listOfFilterAddress = [
		{ text: 'London', value: 'London' },
		{ text: 'Sidney', value: 'Sidney' },
	];
	public listOfSearchAddress: string[] = [];
	public listOfData: Array<{
		name: string;
		age: number;
		address: string;
		[key: string]: string | number;
	}> = [
		{
			name: 'John Brown',
			age: 32,
			address: 'New York No. 1 Lake Park',
		},
		{
			name: 'Jim Green',
			age: 42,
			address: 'London No. 1 Lake Park',
		},
		{
			name: 'Joe Black',
			age: 32,
			address: 'Sidney No. 1 Lake Park',
		},
		{
			name: 'Jim Red',
			age: 32,
			address: 'London No. 2 Lake Park',
		},
	];
	public listOfDisplayData = [...this.listOfData];

	public reset(): void {
		this.searchValue = '';
		this.search();
	}

	public sort(sortName: string, value: string): void {
		this.sortName = sortName;
		this.sortValue = value;
		this.search();
	}

	public filterAddressChange(value: string[]): void {
		this.listOfSearchAddress = value;
		this.search();
	}

	public search(): void {
		const filterFunc = (item: {
			name: string;
			age: number;
			address: string;
		}) => {
			return (
				(this.listOfSearchAddress.length
					? this.listOfSearchAddress.some(
							address => item.address.indexOf(address) !== -1
					  )
					: true) && item.name.indexOf(this.searchValue) !== -1
			);
		};
		const data = this.listOfData.filter(
			(item: { name: string; age: number; address: string }) =>
				filterFunc(item)
		);
		this.listOfDisplayData = data.sort((a, b) =>
			this.sortValue === 'ascend'
				? a[this.sortName!] > b[this.sortName!]
					? 1
					: -1
				: b[this.sortName!] > a[this.sortName!]
				? 1
				: -1
		);
	}
}
