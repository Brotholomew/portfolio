import { Component, OnInit } from '@angular/core';
import {animate, AnimationEvent, state, style, transition, trigger} from "@angular/animations";
import { ball } from "./ball";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
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
export class ContactComponent implements OnInit {
  gitBalls: ball[] = [];
  linkedinBalls: ball[] = [];
  mailBalls: ball[] = [];
  ballsCount = 15;
  colors = ['#7986CB', '#BA68C8', '#F06292'];

  constructor() { }

  ngOnInit(): void {
    this.ballsify('git');
    this.ballsify('linkedin');
    this.ballsify('mail');
  }

  onBallsMovement(event: AnimationEvent, optx: string, i: number): void {
    let balls = this.gitBalls;
    if (optx === 'linkedin') balls = this.linkedinBalls;
    else if (optx === 'mail') balls = this.mailBalls;

    if (event.phaseName === 'done') {
      if (event.toState === 'fro') {
        balls[i].animationConfig.params.toX = Math.random() * 98;
        balls[i].animationConfig.params.toY = Math.random() * 98;
      }

      if (event.toState === 'to') {
        balls[i].animationConfig.params.froX = Math.random() * 98;
        balls[i].animationConfig.params.froY = Math.random() * 98;
      }

      this.initiate(i, optx);
    }
  }

  onBallClicked(i: number, optx: string) {
    let balls = this.gitBalls;
    if (optx == 'linkedin') balls = this.linkedinBalls;
    else if (optx === 'mail') balls = this.mailBalls;

    balls[i].color = this.colors[Math.floor(Math.random() * this.colors.length)];
    balls[i].size = balls[i].size + Math.random() * (Math.random() < 0.5 ? 1 : -1);
  }

  initiate(index = -1, optx: string): void {
    let balls = this.gitBalls;
    if (optx == 'linkedin') balls = this.linkedinBalls;
    else if (optx === 'mail') balls = this.mailBalls;

    if (index === -1) {
      for (let i = 0; i < this.ballsCount; i++) {
        balls[i].animationConfig.value = balls[i].animationConfig.value === 'to' ? 'fro' : 'to';
      }
    } else {
      balls[index].animationConfig.value = balls[index].animationConfig.value === 'to' ? 'fro' : 'to';
    }
  }

  ballsify(optx: string): void {
    let balls = this.gitBalls;
    let increment = 0;
    if (optx == 'linkedin') {
      balls = this.linkedinBalls;
      increment = 1;
    }
    else if (optx === 'mail') {
      balls = this.mailBalls;
      increment = 2;
    }

    for (let i = 0; i < this.ballsCount; i++) {
      let ball = {
        color: this.colors[Math.floor((Math.random() * this.colors.length) + increment) % this.colors.length],
        scale: Math.random(),
        size: Math.random() * 0.5 + 0.5,
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
      balls.push(ball);
    }
  }

}
