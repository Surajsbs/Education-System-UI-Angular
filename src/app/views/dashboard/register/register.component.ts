import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegisterUserRequestModel } from '../../../_models/register.user.request.model';
import { RegistrationService } from "../../../_services/registration.service";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import moment from 'moment';
import { CustomValidator } from "../../../_validators/custom.validator";
import { CommonService } from "../../../_services/common.service";
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';
import { Notification } from '../../../_util/notification.service';
import { CommonUtil } from '../../../_util/common.util';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  FeesStatus:string[] = [];
  ClassDurations = [{}];
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  register: RegisterUserRequestModel;
  error = '';
  registerResponse: HttpResponse<any>;
  classNames: LoadClassesResponse[];
  response: any;
  genders:string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notification: Notification,
    private service: RegistrationService,
    private validator: CustomValidator,
    private commonService: CommonService,
    private commonUtil: CommonUtil,
    private formBuilder: FormBuilder
    
  )
  {
    this.FeesStatus = this.commonUtil.feesStatus;
    this.ClassDurations = this.commonUtil.classDuration;
   }


  ngOnInit() {
    this.notification.show();
    this.commonService.fetchClasses().then(data=> this.classNames = data);
    this.registerForm = this.validator.validateRegisterForm(this.formBuilder);
    this.f.joiningDate.setValue(moment(new Date()).format("YYYY-MM-DD"));
    this.genders = this.commonUtil.gender;
    this.notification.hide();
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      if (this.registerForm.invalid) {
          return;
      }
      this.notification.show();
      this.loading = true;

      let jDate = moment( this.f.joiningDate.value, 'yyyy-MM-ddTHH:mm:ss.SSSZ',false).format("YYYY-MM-DD");
      this.register = new RegisterUserRequestModel()
      this.register.firstName = this.f.firstName.value;
      this.register.lastName = this.f.lastName.value;
      this.register.mobileNumber = this.f.mobileNumber.value;
      this.register.email = this.f.email.value;
      this.register.feeAmount = this.f.feeAmount.value;
      this.register.joiningDate = jDate;
      this.register.classNamedd = this.f.classNamedd.value;
      this.register.classDurationdd = this.f.classDurationdd.value;
      this.register.feesStatusdd = this.f.feesStatusdd.value;
      this.register.password = this.f.password.value;
      this.register.address = this.f.address.value;
      this.register.activeStatusDD = this.f.activeStatusDD.value;
      this.register.discountAmount = this.f.discountAmount.value;
      this.register.gender = this.f.gender.value;
      
      this.service.register(this.register).subscribe(data => { this.validateRegisterResponse(data) });
      this.loading = false;
      this.notification.hide();

  }


  validateRegisterResponse(data) {
    if(data.status === 200) {
        if(data.body.status === 200) {
          this.notification.success(data.body.message);
        } else {
          this.notification.error(data.body.message);
          this.error = data.body.message;
        }
    } else{
      this.notification.error("Unable to register user");
    }
    this.onReset();
  }

  onReset() {
    this.loading = false;
    this.submitted = false;
    this.registerForm.reset();
    this.setDefaultsOnLoad();
  }

  setClassFeeAmout(event) {
      this.classNames.forEach(
          obj => {
              if(obj.classId == event) {
                  this.f.feeAmount.setValue(obj.classFee);
                  return;
              }
          }
      );
  }


  setDefaultsOnLoad() {
    this.f.classNamedd.setValue("");
    this.f.classDurationdd.setValue("");
    this.f.activeStatusDD.setValue("Yes");
    this.f.feesStatusdd.setValue("");
    this.f.discountAmount.setValue(0);
    this.f.joiningDate.setValue(moment(new Date()).format("YYYY-MM-DD"));
  }

}
