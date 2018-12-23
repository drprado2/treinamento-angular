import {Component, Input, OnInit} from '@angular/core';
import {ModalSize} from "./modaSize.enum";
import {ModalButton} from "./button.modal";
import {ButtonType} from "./buttonType.enum";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public isOpen: boolean = false;
  @Input() modalSize: ModalSize = ModalSize.medium;
  @Input() buttons: ModalButton[] = [];
  @Input() title: string = '';
  @Input() closeOnOverlayClick: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  overlayClick(event) {
    if(!event.target.classList.contains('modal-overlay'))
      return;

    if(this.closeOnOverlayClick)
      this.close();
  }
}
