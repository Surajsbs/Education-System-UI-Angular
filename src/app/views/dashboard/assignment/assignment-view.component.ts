

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
import { AssignmentResponseModel } from '../../../_models/response/assignment.response.model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from '../../../_util/date.util';
import { CommonUtil } from '../../../_util/common.util';
import { AssignmentService } from '../../../_services/assignment.service';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';


@Component({
  selector: 'app-dashboard',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.css']
})

export class AssignmentViewComponent implements OnInit {
  displayedColumns = ['Title', 'StartDate', 'SubmissionDate', 'View', 'Edit', 'Delete'];
  assignDatabase: AssignmentService | null;
  dataSource: AssignmentDataSource | null;
  response: any;
  userClass: AssignmentResponseModel;
  className: any;
  classFee; any;
  modalRef: NgbModalRef;
  assign: AssignmentResponseModel;
  classes: LoadClassesResponse[];
  classDurations: string[];
  feesStatus: string[];
  types: string[];

  constructor(
    private httpClient: HttpClient,
      private dialog: MatDialog,
      private notification: Notification,
      private assignService: AssignmentService,
      private commonService: CommonService,
      private modalService: NgbModal,
      private dateUtil: DateUtil,
      private commonUtil: CommonUtil
  ) {
      this.types = this.commonUtil.noteTypes;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.notification.show();
    this.loadData();
    this.commonService.fetchClasses().then(data=>this.classes = data);
    this.classDurations = this.commonUtil.classDuration;
    this.feesStatus = this.commonUtil.feesStatus;
    this.notification.hide();
  }

  // refresh() {
  //     this.loadData();
  // }

  viewAssign(viewAssignModel, assign: AssignmentResponseModel) {
      this.assign = assign;
      this.fetchClass(assign.classId);
      this.modalService.open(viewAssignModel, {backdrop: 'static' });
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


  editAssign(editAssignModel, assign: AssignmentResponseModel) {
      this.assign = assign;
      this.modalRef = this.modalService.open(editAssignModel, {backdrop: 'static', size: 'xl' });
  }

  deleteAssign(deleteAssignModel, assign) {
      this.assign = assign;
      this.modalRef = this.modalService.open(deleteAssignModel, {backdrop: 'static', size: 'sm' });
  }

  onChangeFetchClass (classId) {
      this.fetchClass(classId);
  }

  submit(assign) {
      assign.startDate = this.dateUtil.format(assign.startDate);
      assign.creationDate = this.dateUtil.format(assign.creationDate);
      this.update(assign);
      this.modalRef.close();
  }

  async update(assign) {
      this.notification.show();
      try {
          this.response = await this.assignService.updateAssignment(assign).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
              this.notification.error("Unable to update assignment");
      }
      this.notification.hide();
  }

  confirmDelete(assign) {
      this.notification.show();
      this.cnfDelete(assign.assignmentId);
      this.modalRef.close();
      this.loadData();
      this.notification.hide();
  }

  async cnfDelete(id: number) {
      this.notification.show();
      try {
          this.response = await this.assignService.deleteAssignment(id).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
              this.notification.error("Unable to delete note");
      }
      this.notification.hide();
  }

  public loadData() {
      this.notification.show();
      this.assignDatabase = new AssignmentService(this.httpClient, this.notification);
      this.dataSource = new AssignmentDataSource(this.assignDatabase, this.paginator, this.sort);
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


export class AssignmentDataSource extends DataSource<AssignmentResponseModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: AssignmentResponseModel[] = [];
  renderedData: AssignmentResponseModel[] = [];

  constructor(public assignData: AssignmentService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<AssignmentResponseModel[]> {
    const displayDataChanges = [
      this.assignData.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.assignData.getAssignments();

      return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this.assignData.data.slice().filter((assign: AssignmentResponseModel) => {
        const searchStr = (assign.title + assign.description + assign.startDate + assign.creationDate).toLowerCase();
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
  sortData(data: AssignmentResponseModel[]): AssignmentResponseModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'Title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'Description': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'StartDate': [propertyA, propertyB] = [a.startDate, b.startDate]; break;
        case 'CreationDate': [propertyA, propertyB] = [a.creationDate, b.creationDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

