import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';

import {
  DetailComponent,
  DialogOverviewExampleDialog,
} from './detail.component';
import { SharedModule } from '../shared/shared.module';
import { FilesModule } from '../shared/files/files.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [DetailComponent, DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    SharedModule,
    DetailRoutingModule,
    FilesModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class DetailModule {}
