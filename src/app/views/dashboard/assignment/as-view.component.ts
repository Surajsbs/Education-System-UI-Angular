// import { Component, OnInit, ViewChild } from '@angular/core';
// import { LoadClassesResponse } from '../../../_models/response/laod.class.response';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { HttpClient } from '@angular/common/http';
// import { ASService } from '../../../_services/as.service';
// import { CommonService } from '../../../_services/common.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { DateUtil } from '../../../_util/date.util';
// import { CommonUtil } from '../../../_util/common.util';
// import { Notification } from '../../../_util/notification.service';


// @Component({
//     templateUrl: './as-view.component.html',
//     styleUrls: ['./as-view.component.css']
// })
// export class ASViewComponent implements OnInit {
//     private classes: LoadClassesResponse[];
//     private response: any;

//     constructor(
//         private commonService: CommonService,
//         private notification: Notification
//     ) {  }

//     @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
//     @ViewChild(MatSort, {static: true}) sort: MatSort;
//     @ViewChild('filter',  {static: true}) filter: ViewChild;

//     ngOnInit() {
//         this.commonService.fetchClasses().then(data=>this.classes = data);
//     }

// }



import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Notification } from '../../../_util/notification.service';
import { CommonService } from '../../../_services/common.service';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from '../../../_util/date.util';
import { CommonUtil } from '../../../_util/common.util';
import { NoteService } from '../../../_services/note.service';
import { ASViewResponseModel } from '../../../_models/response/as-view.response.model';
import { ASService } from '../../../_services/as.service';
import { UserResponseModel } from '../../../_models/response/user.response.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './as-view.component.html',
  styleUrls: ['./as-view.component.css']
})

export class ASViewComponent implements OnInit {
  displayedColumns = ['AssignmentTitle', 'AssignmentDescription', 'ClassName', 'SubmissionDate', 'UserDetail'];
  private asViewDatabase: ASService | null;
  private dataSource: ASViewDataSource | null;
  private response: any;
  private userClass: LoadClassesResponse;
  private className: any;
  private classFee; any;
  private modalRef: NgbModalRef;
  private asViewModel: ASViewResponseModel;
  private classes: LoadClassesResponse[];
  private users: UserResponseModel[];

  constructor(
      public httpClient: HttpClient,
      private notification: Notification,
      private noteService: NoteService,
      private commonService: CommonService,
      private modalService: NgbModal,
      private dateUtil: DateUtil,
      private commonUtil: CommonUtil
  ) {
      
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.notification.show();
    this.loadData();
    this.commonService.fetchClasses().then(data=>this.classes = data);
    this.notification.hide();
  }

  // refresh() {
  //     this.loadData();
  // }

  viewNote(viewNoteModel, asViewModel: ASViewResponseModel) {
      this.asViewModel = asViewModel;
      this.fetchClass(asViewModel.classId);
      this.modalService.open(viewNoteModel, {backdrop: 'static' });
  }

  async fetchClass(classId) {
      this.notification.show();
      try {
          this.response = await this.commonService.fetchClass(classId).toPromise();
          if(this.response.status === 200) {
              this.userClass = this.response.result;
              this.classFee = this.response.result.classFee;
              this.className = this.response.result.className;
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.hide();
          this.notification.error("Unable to load class");
      }
      this.notification.hide();
  }

  async fetchUsers(assignmentId, classId) {
      this.notification.show();
      try {
          this.response = await this.commonService.fetchUsersByClassAndAssignment(assignmentId, classId).toPromise();
          if(this.response.status === 200) {
            this.users = this.response.result;
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.error("Unable to load classes");
      }
      this.notification.hide();
  }

  onChangeFetchClass (classId) {
      this.fetchClass(classId);
  }

  // viewASDetail(viewASModel, asViewModel) {
  //     this.asViewModel = asViewModel;
  //     this.modalService.open(viewASModel, {backdrop: 'static' });
  // }

  viewUserDetail(viewUserModel, asViewModel) {

    console.log('assignmentId -> ', asViewModel.assignmentId + ', classId -> ',asViewModel.classId);

    this.asViewModel = asViewModel;
    this.fetchUsers(asViewModel.assignmentId, asViewModel.classId);
    this.modalService.open(viewUserModel, {backdrop: 'static' });
  }

  public loadData() {
      this.notification.show();
      this.asViewDatabase = new ASService(this.httpClient, this.notification);
      this.dataSource = new ASViewDataSource(this.asViewDatabase, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
          .subscribe(() => {
            if (!this.dataSource) {
              return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
      });
      this.notification.hide();
  }
} 


export class ASViewDataSource extends DataSource<ASViewResponseModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: ASViewResponseModel[] = [];
  renderedData: ASViewResponseModel[] = [];

  constructor(public assignService: ASService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<ASViewResponseModel[]> {
    const displayDataChanges = [
      this.assignService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.assignService.getAssignmentSubmissionView();

    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this.assignService.data.slice().filter((asViewModel: ASViewResponseModel) => {
        const searchStr = (asViewModel.title + asViewModel.description + asViewModel.className + asViewModel.submissionDate).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: ASViewResponseModel[]): ASViewResponseModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      

      switch (this._sort.active) {
        case 'AssignmentTitle': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'AssignmentDescription': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'ClassName': [propertyA, propertyB] = [a.className, b.className]; break;
        case 'SubmissionDate': [propertyA, propertyB] = [a.submissionDate, b.submissionDate]; break;
        
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

