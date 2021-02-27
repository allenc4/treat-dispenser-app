import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  private settingsUrl: string;
  private settingsMap: {[name: string]: {[name: string]: {type: 'number' | 'string', val: any}}};
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.settingsUrl = environment.PETCAM_CONTROL_URL;
    this.http = http;
  }

  ngOnInit(): void {

    // Get list of available settings
    this.http.get<{[name: string]: {[name: string]: [any]}}>(`${this.settingsUrl}/settings`).subscribe({
      next: val => {
        Object.keys(val).forEach(setting => {
          this.settingsMap = {};
          this.settingsMap[setting] = {};
          for (const [key, value] of Object.entries(val[setting])) {
            const type = isNaN(Number(value)) ? 'string' : 'number';
            this.settingsMap[setting][key] = {type, val: value};
          }
        });
        console.log(this.settingsMap);
      },
      error: error => {
        console.error('Error occurred getting the settings', error);
      }
    });

  }

}
