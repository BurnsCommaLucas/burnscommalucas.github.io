import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithubSquare, faTwitch } from '@fortawesome/free-brands-svg-icons';
import {  } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  linkedin = faLinkedin;
  github = faGithubSquare;
  twitch = faTwitch;
  constructor() { }

  ngOnInit() {
  }

}
