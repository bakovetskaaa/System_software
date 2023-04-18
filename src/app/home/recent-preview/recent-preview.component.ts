import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-preview',
  templateUrl: './recent-preview.component.html',
  styleUrls: ['./recent-preview.component.scss'],
})
export class RecentPreviewComponent {
  displayedColumns: string[] = ['name', 'modified', 'extension'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  name: string;
  modified: Date;
  extension: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', modified: new Date(), extension: 'txt' },
  { name: 'Helium', modified: new Date(), extension: 'sh' },
  { name: 'Lithium', modified: new Date(), extension: 'exe' },
];
