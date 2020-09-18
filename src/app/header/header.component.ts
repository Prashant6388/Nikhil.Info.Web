import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public storeService: StoreService,
    private router: Router) { }

  ngOnInit(): void {
  }
  logOut() {
    this.storeService.loggedInUser = null;
    this.router.navigate(['/login']);
  }
}
