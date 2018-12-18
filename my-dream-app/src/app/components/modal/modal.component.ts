import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  public isOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

}
