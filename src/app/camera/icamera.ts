import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {KeyValuePair} from '../utils/keyvaluepair';

interface ICamera {
  getId(): number;
  getName(): string;
  getBaseUrl(): string;
  getStreamUrl(): string;
  getResolutions(): KeyValuePair[];

  setResolution(res: number): void;
}

class ESPCam implements ICamera {
  // static constants
  static readonly CONTROL_URL = '/control';
  static readonly RESOLUTIONS = [0, 3, 4, 5, 6, 7, 8, 9, 10];

  private id: number;
  private name: string;
  private url: string;
  private http: HttpClient;

  constructor(id: number, name: string, url: string, http: HttpClient) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.http = http;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBaseUrl(): string {
    return this.url;
  }

  getStreamUrl(): string {
    return `${this.url}:81/stream`;
  }

  getResolutions(): KeyValuePair[] {
    return [
      {key: 3, value: 'HQVGA(240x176)'},
      {key: 4, value: 'QVGA(320x240)'},
      {key: 5, value: 'CIF(400x296)'},
      {key: 6, value: 'VGA(640x480)'},
      {key: 7, value: 'SVGA(800x600)'},
      {key: 8, value: 'XGA(1024x768)'},
      {key: 9, value: 'SXGA(1280x1024)'},
      {key: 10, value: 'UXGA(1600x1200)'},
    ];
  }

  private buildResolutionURL(res: number): string {
    // Ensure res is in the array, otherwise default
    console.log(ESPCam.RESOLUTIONS);
    console.log(res);
    if (!_.find(ESPCam.RESOLUTIONS, ( (obj) => obj === res )) ) {
      res = 6;
    }
    return `${this.url}${ESPCam.CONTROL_URL}?var=framesize&val=${res}`;
  }

  setResolution(res: number): void {
    // Get the resolution url to call
    const setResUrl = this.buildResolutionURL(res);
    // Make the http request
    this.http.get(setResUrl).subscribe({
      error: error => {
        console.error('Error occurred setting the resolution', error);
      }
    });
  }


}

export {
  ICamera, ESPCam
};

