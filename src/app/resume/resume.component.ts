import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resume',
  templateUrl: './repo/resume.html',
  styleUrls: ['./repo/style.css']
})
export class ResumeComponent {
  pdf = faFilePdf;

  constructor(activatedRoute: ActivatedRoute, titleService: Title) {
    activatedRoute.data.subscribe((data) => titleService.setTitle(data['title']));
  }
}
