import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files/files.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [FilesComponent],
  imports: [CommonModule, MatCardModule, MatIconModule],
  exports: [FilesComponent],
})
export class FilesModule {}
