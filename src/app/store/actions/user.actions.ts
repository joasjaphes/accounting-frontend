import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const loadUsers = createAction(
  '[User] Load Users'
);

export const addCurrentUser = createAction('[Login Page] Add current user to local storage', props<{ user: User; }>());
export const removeCurrentUser = createAction('[Top Menu] Remove current user');
export const setProfilePicture = createAction('[Profile page] Set current user profile picture', props<{url:string}>());




