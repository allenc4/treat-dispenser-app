import {Component, EventEmitter, OnInit} from '@angular/core';
import { ICamera, ESPCam } from './icamera';
import {HttpClient} from '@angular/common/http';
import {KeyValuePair} from '../utils/keyvaluepair';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {
  cam1: ICamera;
  resolutions: KeyValuePair[] = [];
  selectedRes = 6;
  fullscreenView = false;

  constructor(http: HttpClient) {
    // Hardcode a camera definition here. Should add a database and query devices based on user in future
    this.cam1 = new ESPCam(1, 'Kody Cam', environment.PETCAM_CAM_URL, http);
  }

  ngOnInit(): void {
    this.resolutions = this.cam1.getResolutions();
    this.changeResolution(6);
  }

  changeResolution(res: number): void {
    this.selectedRes = res;
    this.cam1.setResolution(res);
  }

}
