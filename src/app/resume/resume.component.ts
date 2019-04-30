import { Component, OnInit, ViewChild } from '@angular/core';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resume',
  templateUrl: './repo/resume.html',
  styleUrls: ['./repo/style.css']
})
export class ResumeComponent implements OnInit {
  pdf = faFilePdf;

  constructor() { }

  ngOnInit() {
  }

}
