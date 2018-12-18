import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from "../../services/loader.service";
import {LoaderObserver} from "../../interfaces/LoaderObserver";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, LoaderObserver {
  public show: boolean = false;
  @Input() public overlayWidth: string = '100%';
  @Input() public overlayHeight: string = '100%';

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.addObserver(this);
  }

  update(isLoading: boolean) {
    this.show = isLoading;
  }
}
