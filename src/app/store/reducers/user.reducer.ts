import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as userActions from '../actions/user.actions';


export const userFeatureKey = 'user';

export interface State extends EntityState<User> {
  loading: boolean;
  loaded: boolean;
  currentUser?: User;
  profilePicture?:string;
}

export const adapter: EntityAdapter<User> = createEntityAdapter();

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
  currentUser: undefined,
  profilePicture:'assets/icons/alt-profile.png'
});

export const userReducer = createReducer(
  initialState,
  on(userActions.addCurrentUser, (state, action) => {
    return {
      ...state,
      currentUser: action.user
    };
  }),
  on(userActions.removeCurrentUser, (state) => {
    return {
      ...state,
      currentUser:undefined
    }
  }),
  on(userActions.setProfilePicture,(state,action) => {
    return {
      ...state,
      profilePicture:action.url
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const getLoading = (state:State) => state.loading;
export const getLoaded = (state:State) => state.loaded;
export const getCurrentUser = (state:State) => state.currentUser;
export const getCurrentUserProfilePicture = (state:State) => state.profilePicture

export const {
  selectAll,
  selectEntities
} = adapter.getSelectors();

