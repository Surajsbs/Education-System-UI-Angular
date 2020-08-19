import {Component} from '@angular/core';
import { navItems } from '../../../_nav';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../../../_services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {
    public sidebarMinimized = true;
    public navItems = navItems;

    constructor (
        private router: Router,
        private commonService: CommonService
    ) {}
    

    toggleMinimize(e) {
      this.sidebarMinimized = e;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/'])
    }

    profile() {
        const currentUser = localStorage.removeItem('currentUser');
        this.commonService.profile(currentUser);
    }
}
