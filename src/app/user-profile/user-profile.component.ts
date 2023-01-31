import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClientService } from '../services/http-client.service';
import { FormConfig } from '../shared/components/custom-form/form-config';
import { addCurrentUser, setProfilePicture } from '../store/actions/user.actions';
import { User } from '../store/models/user.model';
import { AppState } from '../store/reducers';
import * as userSelector from '../store/selectors/user.selectors';

@Component({
  selector: 'accounting-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  imagePath: any = 'assets/icons/alt-profile.png';
  profilePictureUrl$: Observable<string>;
  currentUser: User;
  profileForm: FormGroup;
  formFields: FormConfig[] = [];
  loading = false;
  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: { user: User; },
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private http: HttpClientService
  ) { }

  ngOnInit(): void {
    this.profilePictureUrl$ = this.store.pipe(select(userSelector.selectProfilePicture));
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: [''],
      lastname: ['', Validators.required],
      email: [''],
      phoneNumber: [''],
      profilePhoto: ['']
    });
    if (this.data?.user) {
      console.log('user', this.data.user);
      this.currentUser = this.data.user;
      this.imagePath = this.currentUser?.profilePhoto;
      this.profileForm.patchValue({
        firstname: this.currentUser.firstName,
        surname: this.currentUser.surname,
        lastname: this.currentUser.lastName,
        email: this.currentUser.email,
        phoneNumber: this.currentUser.phoneNumber,
        profilePhoto: this.currentUser.profilePhoto
      });
    }
  }

  onFile(event) {
    console.log('event', event.target.files[0]);
    const file = event.target.files[0];
    console.log('file size', file.size);
    var reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem('profile-pic', this.imagePath);
      this.imagePath = reader.result;
      this.profileForm.patchValue({
        profilePhoto: this.imagePath
      });
      this.store.dispatch(setProfilePicture({ url: this.imagePath }));
      console.log('RESULT', reader.result);
    };
    reader.readAsDataURL(file);
  }

  async onUpdate() {
    this.loading = true;
    try {
      const formData = this.profileForm.value;
      const userPayload: User = {
        id: this.currentUser.id,
        firstName: formData['firstname'],
        surname: formData['surname'],
        lastName: formData['lastName'],
        email: formData['email'],
        phoneNumber: formData['phoneNumber'],
        profilePhoto: formData['profilePhoto']
      };
      await firstValueFrom(this.http.put('api/users', userPayload));
      localStorage.setItem('accounting-user', JSON.stringify(userPayload));
      this.store.dispatch(addCurrentUser({ user: userPayload }));
      this.onCancel();
    } catch (e) {
      console.error('Failed to update profile', e);
    }
    this.loading = false;
  }

  onCancel() {
    this.dialog.closeAll();
  }

}
