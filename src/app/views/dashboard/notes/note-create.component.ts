import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoteCreateModel } from '../../../_models/notecreatemodel';
import { Notification } from '../../../_util/notification.service';
import { CommonService } from '../../../_services/common.service';
import { NoteService } from '../../../_services/note.service';
import moment from 'moment';
import { CommonUtil } from '../../../_util/common.util';
import { DateUtil } from '../../../_util/date.util';

@Component({
  templateUrl: './note-create.component.html'
})
export class NoteCreateComponent implements OnInit {
  classes: any[];
  noteTpes:string[] = [];
  createNoteForm: FormGroup;
  loading = false;
  submitted = false;
  noteModel: NoteCreateModel;
  response: any;
  classTypes: string[];


  constructor(
        private formBuilder: FormBuilder,
        private notification: Notification,
        private commonService: CommonService,
        private noteService: NoteService,
        private commonUtil: CommonUtil,
        private dateUtil: DateUtil
  )  
  {
      this.classTypes = this.commonUtil.noteTypes;
  }

   ngOnInit() {
      this.createNoteForm = this.formBuilder.group({
          Title: ['', Validators.required],
          Description: ['', Validators.required],
          classNamedd: ['', Validators.required],
          NoteActiveDD: ['Yes', Validators.required],
          NoteTypeDD: ['', Validators.required],
          NoteUrl: ['', Validators.required],
          NoteStartDate: ['', Validators.required],
          NoteEndDate: ['', Validators.required],
          noteCreationDate: ['', Validators.required],
      });

      
      this.commonService.fetchClasses().then(data=>this.classes = data);
      this.f.NoteStartDate.setValue(this.dateUtil.currentDate);
      this.f.noteCreationDate.setValue(this.dateUtil.currentDate);
  }
  
  get f() { return this.createNoteForm.controls; }

  onSubmit() {
        
        this.submitted = true;
        if (this.createNoteForm.invalid) {
            return;
        }
        
        this.loading = true;
      
        const request: any =  {
            'noteStartDate': this.dateUtil.format(this.f.NoteStartDate.value),
            'noteEndDate': this.dateUtil.format(this.f.NoteEndDate.value),
            'noteCreationDate': this.dateUtil.format(this.f.noteCreationDate.value),
            'title': this.f.Title.value,
            'description': this.f.Description.value,
            'classId': this.f.classNamedd.value,
            'noteActiveStatus': this.f.NoteActiveDD.value,
            'noteType': this.f.NoteTypeDD.value,
            'noteUrl': this.f.NoteUrl.value
        };
    
        this.createNote(request);
        this.loading = false;
        this.submitted = false;
        this.setDefaultsOnLoad();
        
  }

  async createNote(request) {
    this.notification.show();
      try {
          this.response = await this.noteService.createNote(request).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.error("Unable to create note");
      }
      this.notification.hide();
  }

  onReset() {
        this.loading = false;
        this.submitted = false;
        this.createNoteForm.reset();
        this.setDefaultsOnLoad();
  }

  setDefaultsOnLoad() {
        this.f.NoteStartDate.setValue(this.dateUtil.currentDate);
        this.f.noteCreationDate.setValue(this.dateUtil.currentDate);
        this.f.NoteEndDate.setValue("");
        this.f.classNamedd.setValue("");
        this.f.NoteActiveDD.setValue("Yes");
        this.f.NoteTypeDD.setValue("");
        this.f.Title.setValue("");
        this.f.Description.setValue("");
        this.f.NoteUrl.setValue("");
  }


}
