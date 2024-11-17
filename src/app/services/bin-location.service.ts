import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { BinLocation } from '../store/bin-location/bin-location.model';

@Injectable({ providedIn: 'root' })
export class BinLocationService {
  constructor(private http: HttpClientService) {}

  async saveBinLocation(binLocation: BinLocation) {
    try {
      await firstValueFrom(this.http.post('binLocations', binLocation));
    } catch (e) {
      console.error('Failed to save bin location', e);
      throw e;
    }
  }

  async getBinLocations(): Promise<BinLocation[]> {
    try {
      return await firstValueFrom(this.http.get('binLocations'));
    } catch (e) {
      console.error('Failed to get bin locations', e);
      throw e;
    }
  }
}
