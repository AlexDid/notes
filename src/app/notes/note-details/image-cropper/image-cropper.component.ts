import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  @Input()
  imageURL: string;

  @Output()
  base64 = new EventEmitter<string>();


  imageChangedEvent: Event = null;
  canvasRotation = 0;
  transform: ImageTransform = {};

  private imageBase64: string;

  constructor() { }

  ngOnInit(): void {
  }

  get image(): string {
    return this.imageBase64 || this.imageURL;
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.imageBase64 = event.base64;
    this.base64.emit(this.imageBase64);
  }

  rotateLeft(): void {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight(): void {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate(): void {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

}
