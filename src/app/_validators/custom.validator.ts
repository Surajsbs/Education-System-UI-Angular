import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CustomValidator {
    
    validateRegisterForm(formBuilder: FormBuilder) {
        return formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            email: ['', Validators.required],
            feeAmount: [''],
            joiningDate: [],
            classNamedd: ['', Validators.required],
            classDurationdd: ['', Validators.required],
            feesStatusdd: ['', Validators.required],
            password: ['', Validators.required],
            cnfpassword: ['', Validators.required],
            address: ['', Validators.required],
            activeStatusDD: ['Yes', Validators.required],
            discountAmount: ['0'],
            gender: ['', Validators.required]
        });
    }


    validateASCreateForm(formBuilder: FormBuilder) {
        return formBuilder.group({
            classId: ['', Validators.required],
            assignmentId: ['', Validators.required],
            selectedUsers: ['', Validators.required],
            activeStatus: ['', Validators.required],
            submissionDate: ['', Validators.required],
            result: ['', Validators.required],
            remark: ['', Validators.required],
        });
    }
}