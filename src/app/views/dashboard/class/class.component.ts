import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassCreateModel } from '../../../_models/class.create.model';
import { ClassService } from '../../../_services/class.service';
import { Notification } from '../../../_util/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  createMiscellaneousForm: FormGroup;
  loading = false;
  submitted = false;
  classModel: ClassCreateModel;
  private response: any;


  constructor(
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private classService: ClassService,
      private notification: Notification
  )  {
    
  }

   ngOnInit() {
      this.createMiscellaneousForm = this.formBuilder.group({
          className: ['', Validators.required],
          classFee: ['', Validators.required],
          activeStatus: ['Yes', Validators.required]
      });
  }

  get f() { return this.createMiscellaneousForm.controls; }

  onSubmit() {
    
    this.submitted = true;

      // stop here if form is invalid
      if (this.createMiscellaneousForm.invalid) {
          return;
      }
      
      this.loading = true;
      this.classModel = new ClassCreateModel();
      this.classModel.className = this.f.className.value;
      this.classModel.classFee = this.f.classFee.value;
      this.classModel.activeStatus = this.f.activeStatus.value;

      
      this.cnfSubmit(this.classModel);
      
      this.loading = false;
      this.loading = false;
  }


  async cnfSubmit(classModel) {
    try {  
        this.response = await this.classService.createClass(classModel).toPromise();
        if(this.response.status === 200) {
          this.notification.success(this.response.message);
        } else {
          this.notification.error(this.response.message);
        }
    } catch (err) {
        this.notification.error(err);
    }
    this.onReset();
  }


  onReset() {
      this.loading = false;
      this.submitted = false;
      this.createMiscellaneousForm.reset();
      this.setDefaultsOnLoad();
  }

  setDefaultsOnLoad() {
      this.f.className.setValue("");
      this.f.classFee.setValue("");
      this.f.activeStatus.setValue("Yes");
  }

}
