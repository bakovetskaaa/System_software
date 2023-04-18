import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isOpenSelector } from './shared/sidenav/store/selectors';
import {
  closeSidenavAction,
  openSidenavAction,
} from './shared/sidenav/store/actions/sidenav-actions';
import { MatList } from '@angular/material/list';
import { FilesService } from './shared/services/files.service';
import { ipcRenderer } from 'electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('settings') menu: MatList;

  isSideNavOpen: boolean;
  showHidden: boolean = false;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private store: Store,
    private foldersService: FilesService
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

  ngOnInit(): void {
    this.initValues();
    this.initListeners();
  }

  initListeners() {
    this.store
      .select(isOpenSelector)
      .subscribe((isOpen: boolean) => (this.isSideNavOpen = isOpen));
  }

  initValues() {}

  onMinimaze(): void {
    ipcRenderer.send('minimizeApp');
  }

  onMaximaze(): void {
    ipcRenderer.send('maximizeApp');
  }

  onClose(): void {
    ipcRenderer.send('closeApp');
  }

  onMenuClick(): void {
    if (this.isSideNavOpen) {
      this.store.dispatch(closeSidenavAction());
    } else {
      this.store.dispatch(openSidenavAction());
    }
  }

  onSettingsClick() {
    this.foldersService.setShowHidden(this.showHidden);
  }
}
