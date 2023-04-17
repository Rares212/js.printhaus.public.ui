import {Component, Input} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
// @ts-ignore
import * as AOS from 'aos';

@Component({
  selector: 'nut-dashboard-intro',
  templateUrl: './dashboard-intro.component.html',
  styleUrls: ['./dashboard-intro.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(2000, style({opacity: 1}))
      ])
    ]),
    trigger('buildUp', [
      transition(':enter', [
        style({ height: 1, overflow: 'hidden', 'padding-bottom': 0, 'padding-top': 0 }),
        animate(4000, style({ height: '*', overflow: 'hidden', 'padding-bottom': '*', 'padding-top': '*' }))
      ])
    ]),
    trigger('rainbow', [
      transition(':enter', [
        style({ background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' }),
        animate('3s linear', style({ backgroundPosition: '100% 0%' })),
        animate('3s linear', style({ backgroundPosition: '0% 0%' }))
      ])
    ])
    // trigger('rainbowText', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('1s ease-out', style({ opacity: 1 }))
    //   ])
    // ])
  ]
})
export class DashboardIntroComponent {

  @Input()
  styleClass: string = '';

  ngOnInit(): void {
    AOS.init({
      easing: 'ease-in-out',
      mirror: true,
      duration: 1000,
      delay: 100
    });
  }

}
