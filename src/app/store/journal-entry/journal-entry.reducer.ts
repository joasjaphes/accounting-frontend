import { Action, createReducer, on } from '@ngrx/store';
import { JournalEntryActions } from './journal-entry.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { JournalEntry } from './journal-entry.model';

export const journalEntryFeatureKey = 'journalEntry';

const adapter: EntityAdapter<JournalEntry> = createEntityAdapter();

export interface State extends EntityState<JournalEntry> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export const journalEntryReducer = createReducer(
  initialState,
  on(JournalEntryActions.upsertJournalEntry, (state, { journal }) => {
    return adapter.upsertOne(journal, state);
  }),
  on(JournalEntryActions.upsertJournalEntries, (state, { journals }) => {
    return adapter.upsertMany(journals, state);
  }),
  on(JournalEntryActions.loadJournalEntries, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(JournalEntryActions.doneloadingJournalEntries, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(JournalEntryActions.deleteJournalEntry, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(JournalEntryActions.clearJournalEntries, (state) => {
    return adapter.removeAll(state);
  })
);

export const { selectAll, selectEntities } = adapter.getSelectors();

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return journalEntryReducer(state, action);
}
