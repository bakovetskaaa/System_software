import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { foldersSelector, isOpenSelector } from '../store/selectors';
import { FolderInterface } from '../../types/folder.interface';
import { FilesService } from '../../services/files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  isOpen: Observable<boolean>;
  folders: string[];

  constructor(
    private store: Store,
    private filesService: FilesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
  }

  initValues() {
    this.isOpen = this.store.pipe(select(isOpenSelector));
    this.folders = this.filesService.getHomeFolders();
  }

  initListeners() {
    this.store.select(isOpenSelector).subscribe((isOpen: boolean) => {
      isOpen ? this.sidenav.open() : this.sidenav.close();
      console.log(isOpen);
    });
  }

  onClick(folder: string): void {
    console.log(folder);
    this.filesService.navigate(folder);
    this.router.navigateByUrl('/detail');
  }

  onHomeClick(): void {
    this.router.navigateByUrl('/home');
  }

  onStarredClick(): void {
    this.router.navigateByUrl('/starred');
  }

  onRecentClick(): void {
    this.router.navigateByUrl('/recent');
  }
}
