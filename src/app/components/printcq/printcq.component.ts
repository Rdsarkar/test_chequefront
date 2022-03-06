import { Component, OnInit } from '@angular/core';
import { PrintcqService } from './service/printcq.service';
import { Res } from './model/res.model';
import { Input1Model } from './model/input1.model';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
DatePipe
@Component({
  selector: 'app-printcq',
  templateUrl: './printcq.component.html',
  styleUrls: ['./printcq.component.css']
})
export class PrintcqComponent implements OnInit {

  p:any;
 

  currentDate = new Date().toISOString().substring(0, 10); //iso string and 0-10 substring must for a html field
  closeResult = '';

  loadPaydate: string = [new Date().getFullYear(), ('0' + (new Date().getMonth() + 1)).slice(-2), ('0' + new Date().getDate()).slice(-2)].join('-');

  displayList: any[] = [];

  constructor(private datePipe: DatePipe, private decimalPipe: DecimalPipe, private printcqservice: PrintcqService, private modalService: NgbModal, private fb: FormBuilder) { }
  insertdata: Input1Model[] = [];

  // tempEditData: any = null;

  isUpdateButtonEnabled: boolean = false;



  chequeForm = this.fb.group({
    id: new FormControl({ value: undefined, disabled: true }),
    pay_to: new FormControl('', [Validators.required]),
    pay_date: new FormControl(this.currentDate, [Validators.required]),
    amount: new FormControl(undefined, [Validators.required]),
    remarks: new FormControl(''),
    entry_userid: new FormControl('admin'),
    flag: new FormControl(0),
    cause_del: new FormControl(''),
    del_flag: new FormControl(0),
    compid: new FormControl(1),
    compyearid: new FormControl(3)
  });


  dateRangeSelectionForm = this.fb.group({
    isDateRangeEnabled: new FormControl(false),
    dateFrom: new FormControl(this.currentDate),
    dateTo: new FormControl(this.currentDate)
  });

  deleteChequeForm = this.fb.group({
    cause_del: new FormControl(''),
  });

  ngOnInit(): void {
  }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }

  // openEditModal(content: any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  onGetDataButtonClick() {
    if (this.dateRangeSelectionForm.get('isDateRangeEnabled')?.value == true) {
      this.printcqservice.GetByDateRange(this.dateRangeSelectionForm.get('dateFrom')?.value
        , this.dateRangeSelectionForm.get('dateTo')?.value).subscribe(
          (zafir) => {
            this.displayList = zafir;
          }
        );
    } else {
      this.printcqservice.GetByDateRange("", "").subscribe(
        (zafir) => {
          this.displayList = zafir;
        }
      );
    }
  }

  setFormData(x: any) {
    this.chequeForm.reset();
    x.pay_date = this.datePipe.transform(x.pay_date, 'yyyy-MM-dd');
    this.chequeForm.patchValue(x);
    this.isUpdateButtonEnabled = true;
  }


  onUpdateButtonClick() {
    this.printcqservice.update(this.chequeForm.get('id')?.value, this.chequeForm.get('pay_to')?.value, this.chequeForm.get('pay_date')?.value, this.chequeForm.get('amount')?.value, this.chequeForm.get('remarks')?.value).subscribe(
      (x) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data Updated Successfully!',
        });
        this.chequeForm.reset();
        this.chequeForm.controls['pay_date'].setValue(this.currentDate);
        this.isUpdateButtonEnabled = false;
        this.onGetDataButtonClick();
      },
      (y) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Data Updated failed!',
        });
      }
    );
  }

  getFormattedNumber(x: number): string {
    if (x) {
      let x1 = this.decimalPipe.transform(x, '1.2-2');
      return "" + x1;
    }
    return "0";
  }

  getFormattedDate(newDate: string): string {
    if (new Date(newDate)) {
      return [('0' + new Date(newDate).getDate()).slice(-2), ('0' + (new Date(newDate).getMonth() + 1)).slice(-2), new Date(newDate).getFullYear()].join('/');
    }
    else {
      return '';
    }
  }

  onDeleteButtonClick(myitem: any) {
    // let g = this.deleteChequeForm.get('cause_del')?.value          for assign one to another variable 
    if (this.deleteChequeForm.get('cause_del')?.value == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Cause of delete is missing !',
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.printcqservice.delete(myitem.id ?? 0, this.deleteChequeForm.get('cause_del')?.value, 1).subscribe(
            (x) => {
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Deleted Successfully!',
              });
              this.deleteChequeForm.reset();
              this.onGetDataButtonClick();
            },
            (y) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops!',
                text: 'Data Deleted failed!',
              });
            }
          );
        }
      });
    }
  }

  onCreateButtonClick() {
    // console.log("amar checkform value");
    // console.log(this.chequeForm.get('amount')?.value);
    if (this.chequeForm.get('pay_to')?.value == "" || this.chequeForm.get('amount')?.value == null || this.chequeForm.get('amount')?.value == "0" || this.chequeForm.get('remarks')?.value == "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please Fill up box !',
      });
    } else {
      let requestBody = this.chequeForm.getRawValue();
      this.printcqservice.CreateKori(requestBody).subscribe(
        (x) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Data Created Successfully!',
          });
          this.chequeForm.reset();
          this.chequeForm.controls['pay_date'].setValue(this.currentDate);
          this.onGetDataButtonClick();
        },
        (y) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Data Created failed!',
          });
        }
      );
    }
  }
}
