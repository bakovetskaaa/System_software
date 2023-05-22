import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentComponent } from './components/recent/recent.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  {
    path: 'recent',
    component: RecentComponent,
  },
];

@NgModule({
  declarations: [RecentComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatCardModule],
})
export class RecentModule {}
