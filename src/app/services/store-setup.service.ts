import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { StoreSetup } from '../store/store-setup/store-setup.model';

@Injectable({
  providedIn: 'root',
})
export class StoreSetupService {
  constructor(private http: HttpClientService) {}

  async getStores() {
    try {
      return await firstValueFrom(this.http.get('stores'));
    } catch (e) {
      console.error('Failed to load stores', e);
      throw e;
    }
  }

  async saveStore(storePayload: StoreSetup) {
    try {
      return await firstValueFrom(this.http.post('stores', storePayload));
    } catch (e) {
      console.error('Failed to save store', e);
      throw e;
    }
  }
}
