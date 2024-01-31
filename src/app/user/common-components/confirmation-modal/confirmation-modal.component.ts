import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  action: string = ""; //takes action whether it is edit or delete to show options 
  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.action) {
      this.action = this.data.action;
    }
  }
  // returns selected answer sure or cancel and close the modal
  confirmationFunc(confirmation: boolean) {
    this.dialogRef.close(confirmation);
  }
}
