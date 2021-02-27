import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

  @Input() open = false;
  @Input() imageURL = '';

  @Output() closeEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
