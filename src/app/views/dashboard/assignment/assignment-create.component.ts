import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AssignmentCreateModel } from '../../../_models/assignmentcreatemodel';
import { AssignmentService } from '../../../_services/assignment.service';
import { CommonService } from '../../../_services/common.service';
import { CommonUtil } from '../../../_util/common.util';
import { DateUtil } from '../../../_util/date.util';
import { Notification } from '../../../_util/notification.service';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';

@Component({
  templateUrl: './assignment-create.component.html'
})
export class AssignmentCreateComponent implements OnInit{
  private assignmentCreateForm: FormGroup;
  private loading = false;
  private submitted = false;
  private assCreateModel: AssignmentCreateModel;
  private classes: LoadClassesResponse[] = [];
  private response: any;
  private activeStatus: string[];


  constructor(
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private assService: AssignmentService,
        private commonService: CommonService,
        private commonUtil: CommonUtil,
        private dateUtil: DateUtil,
        private notification: Notification
  )  {
        
  }

   ngOnInit() {
        this.assignmentCreateForm = this.formBuilder.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            classId: ['', Validators.required],
            activeStatus: ['', Validators.required],
            startDate: ['', Validators.required],
            submissionDate: ['', Validators.required],
            url: ['', Validators.required]
        });
        this.commonService.fetchClasses().then(data=>this.classes = data);
        this.activeStatus = this.commonUtil.activeStatus;
        this.f.startDate.setValue(this.dateUtil.currentDate);

  }

  get f() { return this.assignmentCreateForm.controls; }

  onSubmit() {
    
        this.submitted = true;

        // stop here if form is invalid
        if (this.assignmentCreateForm.invalid) {
            return;
        }
        
        this.loading = true;
        this.assCreateModel = new AssignmentCreateModel();

        this.assCreateModel.title = this.f.title.value;
        this.assCreateModel.description = this.f.description.value;
        this.assCreateModel.classId = this.f.classId.value;
        this.assCreateModel.activeStatus = this.f.activeStatus.value;
        this.assCreateModel.startDate = this.dateUtil.format(this.f.startDate.value);
        this.assCreateModel.submissionDate = this.dateUtil.format(this.f.submissionDate.value);
        this.assCreateModel.url = this.f.url.value;


        console.log(JSON.stringify(this.assCreateModel));


        this.createAssignment(this.assCreateModel);

        this.onReset();

  }

    async createAssignment(assCreateModel) {
        this.notification.show();
        try {
            this.response = await this.assService.createAssignment(assCreateModel).toPromise();
            if(this.response.status === 200) {
                this.notification.success(this.response.message);
            } else {
                this.notification.error(this.response.message);
            }
        } catch (err) {
            this.notification.error("Unable to load assignments");
        }
        this.notification.hide();
    }

  onReset() {
      this.loading = false;
      this.submitted = false;
      this.assignmentCreateForm.reset();
      this.setDefaultsOnLoad();
  }

    setDefaultsOnLoad() {
        this.f.submissionDate.setValue('');
        this.f.startDate.setValue(this.dateUtil.currentDate);
        this.f.title.setValue("");
        this.f.description.setValue("");
        this.f.classId.setValue("");
        this.f.activeStatus.setValue("");
        this.f.url.setValue("");
    }
}