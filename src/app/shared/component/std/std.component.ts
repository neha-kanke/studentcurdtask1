import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Istd } from '../../model/std';
import { stdArr } from '../../const/std';
import { flatMap } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GetconfirmComponent } from '../getconfirm/getconfirm.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-std',
  templateUrl: './std.component.html',
  styleUrls: ['./std.component.scss'],
})
export class StdComponent implements OnInit {
  iseditmode: boolean = false;
  Stdudentarr: Array<Istd> = stdArr;
  EditId!: string;

  @ViewChild('fName') fName!: ElementRef;
  @ViewChild('lName') lName!: ElementRef;
  @ViewChild('Email') Email!: ElementRef;
  @ViewChild('Contact') Contact!: ElementRef;
  constructor(private matdailg: MatDialog, private _matsancebar: MatSnackBar) {}

  ngOnInit(): void {}

  opensnackbar(
    sms: string,
    action: string = 'close',
    duration: number = 800,
    hpostion: MatSnackBarHorizontalPosition = 'center',
    vposition: MatSnackBarVerticalPosition = 'top'
  ) {
    this._matsancebar.open(sms, action, {
      duration,
      horizontalPosition: hpostion,
      verticalPosition: vposition,
    });
  }

  ifanyinputfilled():boolean{
   return !!(this.fName.nativeElement.value ||
    this.lName.nativeElement.value ||
    this.Email.nativeElement.value ||
    this.Contact.nativeElement.value)
  }

  OnaddStd() {
    if(!this.ifanyinputfilled())return
    let newstdobj = {
      fName: this.fName.nativeElement.value,
      lName: this.lName.nativeElement.value,
      Email: this.Email.nativeElement.value,
      Contact: this.Contact.nativeElement.value,
      StdId: Date.now().toString(),
    };
    this.Stdudentarr.push(newstdobj);
    this.opensnackbar(`new student name  ${newstdobj.fName} is added`);
    this.fName.nativeElement.value = '';
    this.lName.nativeElement.value = '';
    this.Email.nativeElement.value = '';
    this.Contact.nativeElement.value = '';
  }

  OnEditBtn(std: Istd) {
    this.EditId = std.StdId;
    this.fName.nativeElement.value = std.fName;
    this.lName.nativeElement.value = std.lName;
    this.Email.nativeElement.value = std.Email;
    this.Contact.nativeElement.value = std.Contact;
    this.iseditmode = true;
  }
  UpdateStd() {
    let findIndex = this.Stdudentarr.findIndex(
      (std) => std.StdId === this.EditId
    );
    let updateobj = {
      fName: this.fName.nativeElement.value,
      lName: this.lName.nativeElement.value,
      Email: this.Email.nativeElement.value,
      Contact: this.Contact.nativeElement.value,
      StdId: this.EditId,
    };
    this.Stdudentarr[findIndex] = updateobj;
    this.opensnackbar(`the stduent name of${updateobj.fName} data is updated `)
    this.fName.nativeElement.value = '';
    this.lName.nativeElement.value = '';
    this.Email.nativeElement.value = '';
    this.Contact.nativeElement.value = '';
    this.iseditmode = false;
  }

  Ondeletetn(StdId: string) {
    let condilogcon = new MatDialogConfig();
    condilogcon.width = '500px';
    condilogcon.height='200px'
    let matdilogconf = this.matdailg.open(GetconfirmComponent, condilogcon);

    matdilogconf.afterClosed().subscribe((res) => {
      let getindex = this.Stdudentarr.findIndex((std) => std.StdId === StdId);
      if (res) {
        let std = this.Stdudentarr.splice(getindex, 1);
        this.opensnackbar(`the student id of ${StdId} data is remove`)
      }
    });
  }
  trackById(index: number, Std: Istd) {
    return Std.StdId;
  }
}
