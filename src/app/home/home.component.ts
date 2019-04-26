import { Component, OnInit, ViewChild, Directive, HostBinding } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostBinding('class') class: string;

  elems;
  strings: string[];
  activeCursor;
  typings: Typed[];

  constructor() {
    this.class = 'content';
    this.strings = [];
    this.typings = [];
  }

  ngOnInit() {
    this.elems = document.querySelectorAll('div[id^="typed-strings"] > p');
    this.elems.forEach((elem) => {
      this.strings.push(elem.innerHTML);
    }, this);
    console.log(this.strings);
    this.nextTyping();
  }

  nextTyping(num = 0, killPrevious = false) {
    const numStr = '-' + num;
    console.log(this.strings[num]);
    const opts = {
      strings: [this.strings[num]],
      typeSpeed: 90,
      showCursor: true,
      cursorChar: '█',
      autoInsertCss: false,
      onStringTyped: () => {
        this.startBlink();
        if (num !== this.strings.length - 1) {
          setTimeout(() => {
            this.stopBlink();
            this.nextTyping(num + 1);
          }, 3000);
        }
      }
    };
    const typed = new Typed('.typing' + numStr, opts);
    if (killPrevious) {
      this.typings.forEach(typing => typing.destroy());
    }
    this.typings.push(typed);
    this.setActiveCursor(num);
  }

  startBlink() {
    const classes = this.activeCursor.classList;
    classes.remove('invisible');
    classes.add('blink');
  }

  stopBlink() {
    const classes = this.activeCursor.classList;
    classes.add('invisible');
    classes.remove('blink');
  }

  setActiveCursor(num) {
    this.activeCursor = document.getElementsByClassName('typed-cursor')[num];
  }
}
