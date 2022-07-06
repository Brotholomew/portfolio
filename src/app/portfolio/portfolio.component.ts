import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  lastScrollPosition = 0;
  constructor(public device : DeviceDetectorService) { }

  ngOnInit(): void {
    AOS.init({disable: 'mobile'});
    document.addEventListener('scroll', (event ) => {this.onScrollSheen()});

    if (this.getScrollElement()?.scrollTop != null) {
      // @ts-ignore
      this.lastScrollPosition = this.getScrollElement()?.scrollTop
    }
  }

  getScrollElement() : Element | null {
    return document.scrollingElement;
  }

  onMouseMove(event: any) {
    let target = document.getElementById('animating-frame');

    const scrollTop = this.getScrollElement()?.scrollTop;
    const height = window.innerHeight;
    const width = window.innerWidth;

    const yAxisDegree = (event.pageX * 2) / width * 10 - 5;
    // @ts-ignore
    const xAxisDegree = (event.pageY - scrollTop) / height * -1 * 10 + 5;

    setTimeout( () => {
      // @ts-ignore
      target?.style.transform = 'rotateY(' + yAxisDegree + 'deg) rotateX(' + xAxisDegree + 'deg)';
    }, 0);
  }

  onMouseLeave() {
    let target = document.getElementById('animating-frame');
    setTimeout(() => {
      // @ts-ignore
      target?.style.transform = 'rotateY(' + 0 + 'deg) rotateX(' + 0 + 'deg)';
    }, 100);
  }

  onScrollSheen() {
    let target = document.getElementById('animating-frame');
    let scrollPos = this.lastScrollPosition;

    if (this.getScrollElement()?.scrollTop != null) {
      // @ts-ignore
      scrollPos = this.getScrollElement()?.scrollTop;
    }

    // @ts-ignore
    target?.style.transform = 'rotateX(' + (this.lastScrollPosition - scrollPos) % 30 + 'deg)';

    this.lastScrollPosition = scrollPos;

    setTimeout( () => this.onMouseLeave(), 200);
  }
}
