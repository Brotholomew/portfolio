import { Component, OnInit } from '@angular/core';
import { ball } from "./ball";
import { trigger, transition, animate, style, keyframes, state } from "@angular/animations";
import { AnimationEvent } from "@angular/animations";
import { DeviceDetectorService } from "ngx-device-detector";
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('moveBall', [
      state('to', style({ 'left': '{{toX}}vw', 'top': '{{toY}}vh' }), {params : { speed: 1, toX: 0, toY: 0, froX: 0, froY: 0}}),
      state('fro', style({ 'left': '{{froX}}vw', 'top': '{{froY}}vh' }), {params : { speed: 1, toX: 0, toY: 0, froX: 0, froY: 0}}),
      state('reset', style({})),
      transition('to <=> fro', [
        animate('{{speed}}ms')
      ], {params : { speed: 1, to: {x: 0, y: 0}, fro: {x: 0, y: 0}}}),
      transition('reset <=> *', [
        animate(100),
      ])
    ]),

  ]
})
export class HomeComponent implements OnInit {
  ballsCount = 30;
  balls: ball[] = [];
  colors = ['#7986CB', '#BA68C8', '#F06292'];

  constructor(public device: DeviceDetectorService) { }

  ngOnInit(): void {
    this.ballsify();
    AOS.init({disable: 'mobile'});
  }

  onBallsMovement(event: AnimationEvent, i: number): void {
    if (event.phaseName === 'done') {
      if (event.toState === 'fro') {
        this.balls[i].animationConfig.params.toX = Math.random() * 98;
        this.balls[i].animationConfig.params.toY = Math.random() * 98;
      }

      if (event.toState === 'to') {
        this.balls[i].animationConfig.params.froX = Math.random() * 98;
        this.balls[i].animationConfig.params.froY = Math.random() * 98;
      }

      this.initiate(i);
    }
  }

  onBallClicked(i: number) {
    this.balls[i].color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.balls[i].size = this.balls[i].size + Math.random() * (Math.random() < 0.5 ? 1 : -1);
  }

  initiate(index = -1): void {
    if (index === -1) {
      for (let i = 0; i < this.ballsCount; i++) {
        this.balls[i].animationConfig.value = this.balls[i].animationConfig.value === 'to' ? 'fro' : 'to';
      }
    } else {
      this.balls[index].animationConfig.value = this.balls[index].animationConfig.value === 'to' ? 'fro' : 'to';
    }
  }

  ballsify(): void {
    for (let i = 0; i < this.ballsCount; i++) {
      let ball = {
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        scale: Math.random(),
        size: Math.random(),
        animationConfig: {
          value: Math.random() > 0.5 ? 'to' : 'fro',
          params: {
            speed: Math.random() * (20000 - 15000) + 15000,
            toX: Math.random() * 98,
            toY: Math.random() * 98,
            froX: Math.random() * 98,
            froY: Math.random() * 98,
          }
        }
      };
      this.balls.push(ball);
    }
  }

  reshapePicture() : void {
    if (this.device.isMobile()) return;

    let iframe = document.getElementById('face-anim-frame');
    let iWindow = (<HTMLIFrameElement>iframe).contentWindow;
    let frameContainer = document.getElementById('main-content-photo');
    let picture = iWindow?.document.getElementById('face-anim');

    if (picture != null) {
      // @ts-ignore
      picture.style.height = '100%';
    }

    let pictureWidth = picture?.clientWidth;
    let pictureHeight = picture?.clientHeight;

    if (frameContainer != null) {
      // @ts-ignore
      frameContainer.style.width = '100%';
      frameContainer.style.height = '100%';
    }

    if (iframe != null) {
      // @ts-ignore
      //iframe.style.width = pictureWidth + 'px';
    }

    let whoamiContainter = document.getElementById('main-content-whoami');
    if (whoamiContainter != null) {
      // @ts-ignore
      whoamiContainter.style.width = '100%';
      // @ts-ignore
      whoamiContainter.style.width = whoamiContainter.clientWidth - (frameContainer.clientWidth - pictureWidth) + 'px';
    }
    /*
        // iframe height
        let textHeight = document.getElementById('main-content-text')?.clientHeight;
        let nameHeight = document.getElementById('main-content-name')?.clientHeight;
        let iframe = document.getElementById('face-anim-frame');
        if (iframe != null) {
          // @ts-ignore
          iframe.style.height = (nameHeight + textHeight) + 'px';
        }
        // @ts-ignore
        console.log(nameHeight + textHeight + '');

        // iframe picture width & height

        let iWindow = (<HTMLIFrameElement>iframe).contentWindow;
        let pictureWidth = iWindow?.document.getElementById('face-anim')?.clientWidth;
        let pictureHeight = iWindow?.document.getElementById('face-anim')?.clientHeight;
        let windowWidth = iframe?.clientWidth;
        let windowHeight = iframe?.clientHeight;
        if (iWindow?.document.getElementById('face-anim') != null) {
          // @ts-ignore
          iWindow.document.getElementById('face-anim').style.left = (windowWidth - pictureWidth) / 2 + 'px';
          // @ts-ignore
          iWindow.document.getElementById('face-anim').style.top = (windowHeight - pictureHeight) / 2 + 'px';
        }
    */
  }

  onLearnMore(flag: boolean) : void {
    let hidden = document.getElementById('hidden');

    if (flag === null) return;

    if (flag) {
      // @ts-ignore
      hidden.style.visibility = 'visible';
      // @ts-ignore
      hidden.style.display = 'inline';
    } else {
      setTimeout(() => {
        // @ts-ignore
        hidden.style.visibility = 'hidden';
        // @ts-ignore
        hidden.style.display = 'none';
      }, 3000);

    }
  }
}
