import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Transaction } from '../store/models/transaction.model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  path = 'transactions';
  constructor(private http: HttpClientService) { }

  saveTransaction(transactionPayload: Transaction) {
    try {
      return  this.http.post(this.path, transactionPayload);
    } catch (e) {
      throw e;
    }
  }

   getAllTransactions(){
    try {
      return  this.http.get(this.path);
    } catch (e) {
      throw e;
    }
  }
}
