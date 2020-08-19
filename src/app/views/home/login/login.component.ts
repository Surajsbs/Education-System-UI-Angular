import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, first } from 'rxjs/operators';

import { AuthenticationService } from '../../../_services/authentication.service';
import { CredentialModel } from '../../../_models/credentialmodel';

@Component({ 
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
 })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    loginSubmitted = false;
    error = '';
    

    fpForm: FormGroup;    
    fploading = false;
    fpSubmitted = false;
    fperror = '';

    returnUrl: string;
    credential: CredentialModel;    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) 
    { 
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.fpForm = this.formBuilder.group({
            forgotPassword: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['/'];
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    get fp() { return this.fpForm.controls; }

    onSubmit() {
        this.loginSubmitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true
        this.credential = new CredentialModel();
        this.credential.username = this.f.username.value;
        this.credential.password = this.f.password.value;

        

        // this.router.navigate(['/dashboard']);
        
        this.authenticationService.login(this.credential)
        .subscribe(data => { this.validateuser(data) }, error => { this.anyError(error) });
        this.loading = false;
        this.loginSubmitted = false;
    }

    validateuser (data) {
        if(data.status === 200) {
            if((data.result.token !== 'NULL' && data.result.token !== 'NULL') || (data.result.username !== '' && data.result.username !== '')) {
                localStorage.setItem('currentUser', JSON.stringify(data.result));
                this.router.navigate(['/dashboard']);
            } else {
                this.error = data.message;
                this.loading = false;
            }
        } else if(data.status === 404){
            this.error = data.message;
            this.loading = false;
        }
    }

    anyError(error) {
        this.error = 'Unable to login';
        this.loading = false;
    }

    forgotPassword(): void {
        this.fpSubmitted = true;

        // stop here if form is invalid
        if (this.fpForm.invalid) {
            return;
        }
        // this.fperror = this.fperror;
        this.fploading = true;
        console.log('called');
    }
}