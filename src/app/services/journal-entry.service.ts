import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { JournalEntry } from '../store/journal-entry/journal-entry.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalEntryService {
  constructor(private http: HttpClientService) {}

  async saveJournal(journal: JournalEntry) {
    try {
      await firstValueFrom(this.http.post('journalEntries', journal));
    } catch (e) {
      console.error('Failed to save journal entry', e);
      throw e;
    }
  }

  async getJournalEntries() {
    try {
      return await firstValueFrom(this.http.get('journalEntries'));
    } catch (e) {
      console.error('Failed to get journal entries', e);
      throw e;
    }
  }
}
