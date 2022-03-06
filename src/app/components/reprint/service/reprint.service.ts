import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Input1Model } from '../../printcq/model/input1.model'
import { Res } from '../../printcq/model/res.model'

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ReprintService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = 'http://localhost:3000/';

  GetPrintedData() {
    return this.httpClient.get<Res>(this.baseUrl + 'GetReprint', headerOption)
  }
}
