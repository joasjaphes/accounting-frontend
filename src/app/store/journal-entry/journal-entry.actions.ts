import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { JournalEntry } from './journal-entry.model';

export const JournalEntryActions = createActionGroup({
  source: 'JournalEntry',
  events: {
    'Load JournalEntries': emptyProps(),
    'Doneloading JournalEntries': emptyProps(),
    'Upsert JournalEntry': props<{ journal: JournalEntry }>(),
    'Upsert JournalEntries': props<{ journals: JournalEntry[] }>(),
    'Delete JournalEntry': props<{ id: string }>(),
    'Clear JournalEntries': emptyProps(),
  },
});
