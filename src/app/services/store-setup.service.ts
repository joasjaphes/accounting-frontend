import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreSetupService {
  constructor() {}

  async getStores() {
    try {
      return null;
    } catch (e) {
      console.error('Failed to load stores', e);
      throw e;
    }
  }
}
