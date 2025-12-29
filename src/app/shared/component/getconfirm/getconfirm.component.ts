import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-getconfirm',
  templateUrl: './getconfirm.component.html',
  styleUrls: ['./getconfirm.component.scss']
})
export class GetconfirmComponent implements OnInit {

  constructor(private matdiloref:MatDialogRef<GetconfirmComponent>) { }

  ngOnInit(): void {
    // this.matdiloref.close()
  }
onclose(flag:boolean){
    this.matdiloref.close(flag)
}
}
