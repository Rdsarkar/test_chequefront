import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChequeComponent } from './components/cheque/cheque.component';
import { PrintcqComponent } from './components/printcq/printcq.component';
import { ReportcqComponent } from './components/reportcq/reportcq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ReprintComponent } from './components/reprint/reprint.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ChequeComponent,
    PrintcqComponent,
    ReportcqComponent,
    ReprintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [DatePipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
