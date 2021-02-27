import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {DispenseService} from '../dispense.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;
  isInDispense = false;
  actionErrMsg = '';

  constructor(private authService: AuthService, private dispenseService: DispenseService) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  dispense(): void {
    if (this.isInDispense) {
      return;
    }
    this.actionErrMsg = '';
    this.isInDispense = true;
    this.dispenseService.dispense().subscribe(() => {
      this.isInDispense = false;
    }, (err: HttpErrorResponse) => {
      this.isInDispense = false;
      console.error(err);
      this.setErrMessageWithClearTimeout(err.message);
    });
  }

  private setErrMessageWithClearTimeout(msg: string): void {
    this.actionErrMsg = `Error occurred - ${msg}`;
    setTimeout(() => {
      this.actionErrMsg = '';
    }, 5000);
  }

}
