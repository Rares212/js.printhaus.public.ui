import { Component, OnInit } from "@angular/core";
import { Object3D } from "three";
import * as AOS from "aos";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'js.printnuts.ui';

  constructor() {
    Object3D.DEFAULT_UP.set(0, 0, 1);
  }

  ngOnInit(): void {
      AOS.init({
          easing: "ease-in-out",
          mirror: false,
          once: false,
          duration: 1000,
          delay: 0,
      });
      // document.addEventListener('scroll', (event) => { AOS.refreshHard();}, {capture: true,     passive: true,})
      // const aosAnimation = document.querySelectorAll('.aos');
      // const observer = new IntersectionObserver((entries) => {
      //     entries.forEach(entry => {
      //         if (entry.intersectionRatio > 0) {
      //             entry.target.classList.add('aos-animate');
      //         } else {
      //             entry.target.classList.remove('aos-animate');
      //         }
      //     });
      // });
      // aosAnimation.forEach(aosObject => {
      //     observer.observe(aosObject);
      // });
  }
}
