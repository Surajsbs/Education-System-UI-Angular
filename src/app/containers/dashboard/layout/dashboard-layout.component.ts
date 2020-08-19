import {Component} from '@angular/core';
import { navItems } from '../../../_nav';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {
  constructor (private router: Router) {}
  public sidebarMinimized = true;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
      sessionStorage.removeItem('currentUser');
      this.router.navigate(['/'])
  }
}
