// src/app/user/user-upsert/user-upsert.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../common-components/confirmation-modal/confirmation-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css'],
})
export class UserUpsertComponent implements OnInit {
  userForm!: FormGroup;
  isEdit: boolean = false;
  userId!: number;
  isLoading: boolean = true;
  progress: number = 0;
  firstNameRequired: boolean = false;
  lastNameRequired: boolean = false;
  cityNameRequired: boolean = false;
  streetNameRequired: boolean = false;
  emailRequired: boolean = false;
  phoneRequired: boolean = false;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private dialog: MatDialog,
    private toster: ToastrService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.initializeForm();
  }
  currentStep = 1;

  private initializeForm(): void {
    this.userForm = this.fb.group({
      id: [0],
      name: this.fb.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required]
      }),
      address: this.fb.group({
        city: ['', Validators.required],
        street: ['', Validators.required]
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/), // accepts only 10-digit numbers
        ],
      ],
    });

    this.route.params.subscribe((params) => {
      this.userId = +params['id'];
      if (this.userId) {
        this.isEdit = true;
        this.dataService.getUserById(this.userId).subscribe((user: any) => {
          this.userForm.patchValue(user);
        });
      }
    });
  }

  // Helper method to get the current step's form group
  get currentStepFormGroup() {
    return this.userForm.get(`step${this.currentStep}`) as FormGroup;
  }

  nextStep() {
    if (this.currentStep === 1 && !this.userForm.get('name.firstname')?.value && !this.userForm.get('name.lastname')?.value) {
      this.firstNameRequired = true;
      this.lastNameRequired = true;
      return;
    }
    else if (this.currentStep === 2 && !this.userForm.get('address.city')?.value && !this.userForm.get('address.street')?.value) {
      this.cityNameRequired = true;
      this.streetNameRequired = true;
      return;
    }
    if (this.currentStep < 3) {
      this.currentStep++;
      this.progress = this.progress + 50;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.progress = this.progress - 50;
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      if (this.isEdit) {
        this.dialog.open(ConfirmationModalComponent, {
          data: { action: "edit" }
        }).afterClosed().subscribe(result => {
          if (result) {
            let _result = this.dataService.updateUser(user);
            if (_result.action) {
              this.toster.success(`User ${user.name.firstname} ${user.name.lastname} has been Updated`, "Updated");
              this.router.navigate(['/users/list']);
            }
            else {
              this.toster.error(_result.message, "Error")
            }
          }
        });
      } else {
        let _result = this.dataService.addUser(user);
        if (_result.action) {
          this.toster.success(`New user ${user.name.firstname} ${user.name.lastname} has been created`, "Created");
          this.router.navigate(['/users/list']);
        }
        else {
          console.log(_result.message)
          this.toster.error(_result.message, "Error")
        }
      }
    }

  }
  onPhoneNumberInput(event: any): void {
    const input = event.target.value;
    // Remove non-numeric characters from the input
    const numericInput = input.replace(/[^0-9]/g, '');
    // Update the input field with the numeric value
    event.target.value = numericInput;
  }
}
