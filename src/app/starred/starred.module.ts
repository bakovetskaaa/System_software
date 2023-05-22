import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarredComponent } from './components/starred/starred.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatInputModule } from '@angular/material/input';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { A11yModule } from '@angular/cdk/a11y';

const routes: Routes = [
  {
    path: 'starred',
    component: StarredComponent,
  },
];

@NgModule({
  declarations: [StarredComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    DialogModule,
    OverlayModule,
    MatInputModule,
    CdkAccordionModule,
    A11yModule,
  ],
  exports: [StarredComponent],
})
export class StarredModule {}
