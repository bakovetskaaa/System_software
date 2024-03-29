import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent, PropertiesComponent } from './files/files.component';
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

@NgModule({
  declarations: [FilesComponent, PropertiesComponent],
  imports: [
    CommonModule,
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
  exports: [FilesComponent],
  bootstrap: [FilesComponent],
})
export class FilesModule {}
