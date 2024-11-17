import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { Packaging } from '../store/packaging/packaging.model';

@Injectable({ providedIn: 'root' })
export class PackagingService {
  constructor(private http: HttpClientService) {}

  async savePackaging(packaging: Packaging) {
    try {
      await firstValueFrom(this.http.post('packaging', packaging));
    } catch (e) {
      console.error('Failed to save packaging', e);
      throw e;
    }
  }

  async getPackagings(): Promise<Packaging[]> {
    try {
      return await firstValueFrom(this.http.get('packaging'));
    } catch (e) {
      console.error('Failed to get packagings', e);
      throw e;
    }
  }
}
