import { Component, OnInit } from '@angular/core';
import { Input1Model } from '../printcq/model/input1.model'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReprintService } from './service/reprint.service';
import { Res } from '../printcq/model/res.model';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-reprint',
  templateUrl: './reprint.component.html',
  styleUrls: ['./reprint.component.css']
})
export class ReprintComponent implements OnInit {

  p:any;

  constructor(private decimalPipe: DecimalPipe,private datePipe: DatePipe,private reprintservice: ReprintService, private fb: FormBuilder) { }
  reprintdata: any=[]

  getFormattedDate(newDate: string): string {
    if (new Date(newDate)) {
      return [('0' + new Date(newDate).getDate()).slice(-2), ('0' + (new Date(newDate).getMonth() + 1)).slice(-2), new Date(newDate).getFullYear()].join('/');
    }
    else {
      return '';
    }
  }


  getFormattedNumber(x: number): string {
    if (x) {
      let x1 = this.decimalPipe.transform(x, '1.2-2');
      return "" + x1;
    }
    return "0";
  }


  ngOnInit(): void {
    this.reprintservice.GetPrintedData().subscribe(
      (data)=>{
        this.reprintdata = data
      }
    )
    // this.getdata();
  }

  // getdata(){
  //   this.reprintservice.GetPrintedData().subscribe((data=>{
  //     this.reprintdata = data
  //     console.log('reprint',this.reprintdata)
  //   }))
  // }

}
