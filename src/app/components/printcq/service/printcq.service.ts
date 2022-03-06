import { Injectable } from '@angular/core';
import { Res } from '../model/res.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Input1Model } from '../model/input1.model'

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PrintcqService {

  constructor(private httpClient: HttpClient) {
  }

  baseUrl: string = 'http://localhost:3000/';
  ShowKori(x: Input1Model) {

  }

  CreateKori(x: any) {
    return this.httpClient.post<any>(this.baseUrl + "insertNewData", x, headerOption);
  }

  GetByDateRange(date_from: string = "", date_to: string = "") {
    let requestBody = {
      payDateFrom: date_from,
      payDateTo: date_to
    }
    return this.httpClient.post<any[]>(this.baseUrl + "GetFreshChequeByDateRange", requestBody, headerOption);
  }
  update(myid: number, mypayto: string, mypaydate: string, amount: number, remarks: string) {
    let requestBody = {
      id: myid,
      pay_to: mypayto,
      pay_date: mypaydate,
      amount: amount,
      remarks: remarks,
    }
    return this.httpClient.put<any>(this.baseUrl + "updatePrintInfo", requestBody, headerOption);
  }
  delete(myid: number, casuse_del: string, del_flag: number) {
    let requestBody = {
      id: myid,
      cause_del: casuse_del,
      del_flag: del_flag,
    }
    return this.httpClient.put<any>(this.baseUrl + "deletePrintInfo", requestBody, headerOption);
  }
}
