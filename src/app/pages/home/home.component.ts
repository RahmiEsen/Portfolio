import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild
} 
from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeroComponent,
  AboutMeComponent,
  MyProjectsComponent,
  TechStackComponent,
  FeedbackComponent,
  ContactComponent,
  SectionWrapperComponent
} from './sections/';
import { GsapAnimatorService } from '../../shared/gsap-animator.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutMeComponent,
    MyProjectsComponent,
    TechStackComponent,
    FeedbackComponent,
    ContactComponent,
    SectionWrapperComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements AfterViewInit {
  showAboutMe = false;
  showProjects = false;
  showTechFeedback = false;
  showContact = false;
  
  @ViewChild('aboutSection') aboutSection!: ElementRef;
  @ViewChild('projectsSection') projectsSection!: ElementRef;
  @ViewChild('techFeedbackSection') techFeedbackSection!: ElementRef;
  @ViewChild('contactSection') contactSection!: ElementRef;
  
  @ViewChild('aboutTrigger') aboutTrigger!: ElementRef;
  @ViewChild('projectsTrigger') projectsTrigger!: ElementRef;
  @ViewChild('techFeedbackTrigger') techFeedbackTrigger!: ElementRef;
  @ViewChild('contactTrigger') contactTrigger!: ElementRef;
  
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const trigger = entry.target;

        if (trigger === this.aboutTrigger.nativeElement) {
          this.animator.fadeInUp(this.aboutSection); // kein show-Flag mehr
        }
        if (trigger === this.projectsTrigger.nativeElement) {
          this.animator.fadeInUp(this.projectsSection);
        }
        if (trigger === this.techFeedbackTrigger.nativeElement) {
          this.animator.fadeInUp(this.techFeedbackSection);
        }
        if (trigger === this.contactTrigger.nativeElement) {
          this.animator.fadeInUp(this.contactSection);
        }

        observer.unobserve(trigger);
      });
    });

    observer.observe(this.aboutTrigger.nativeElement);
    observer.observe(this.projectsTrigger.nativeElement);
    observer.observe(this.techFeedbackTrigger.nativeElement);
    observer.observe(this.contactTrigger.nativeElement);
  }
  constructor(private animator: GsapAnimatorService) {}
}