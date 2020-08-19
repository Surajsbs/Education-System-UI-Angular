import { Injectable, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class Notification implements OnInit {


    constructor(
        private spinner: NgxSpinnerService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        
    }
  
    // Spinner methods
    show() {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 5000);
    }
    hide() {
        this.spinner.hide();
    }

    // Toaster Methods
    success(str) {
        this.toastr.success("<h6>" + str + "</h6>", 'Notification');
    }
    error(str) {
        this.toastr.error("<h6>" + str + "</h6>", 'Notification');
    }
    

    
}