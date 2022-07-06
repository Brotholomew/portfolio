import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  expanded = false;
  constructor(public device: DeviceDetectorService) { }

  ngOnInit(): void {

  }

  menuExpand(val: boolean): void {
    this.expanded = val;
    if (val) {
      // @ts-ignore
      document.getElementById('sidenav').style.width = '100%';
    } else {
      // @ts-ignore
      document.getElementById('sidenav').style.width = '0';
    }

  }

  getNavBarOpacity() {
    // @ts-ignore
    return document.scrollingElement.scrollTop / 100;
  }
}
