import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from '../reducers/user.reducer';

export const userCurrentState = createFeatureSelector<fromReducer.State>(fromReducer.userFeatureKey);

export const selectCurrentUser = createSelector(userCurrentState, fromReducer.getCurrentUser);
export const selectProfilePicture = createSelector(userCurrentState,fromReducer.getCurrentUserProfilePicture);

