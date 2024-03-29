import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService } from '../shared/services/persistence.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(PersistenceService.get('key'));
  }
}
