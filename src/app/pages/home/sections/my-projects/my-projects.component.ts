import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})

export class MyProjectsComponent implements AfterViewInit {
  @ViewChild('openRef', { static: true }) openRef!: ElementRef;
  @ViewChildren('card') cards!: QueryList<ElementRef>;
  
  openText: string = '';
  private defaultText: string = '';
  private viewSourceText: string = '';
  
  technologiesColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Angular: '#dd0031',
    Firebase: '#ffca28',
    API: '#00bcd4'
  };
  
  projects = [
    {
      key: 'join',
      source: 'https://www.youtube.com/watch?v=KKCSwOVudMo',
      technologies: [
        { name: 'Angular', percent: 25 },
        { name: 'TypeScript', percent: 25 },
        { name: 'HTML', percent: 15 },
        { name: 'CSS', percent: 15 },
        { name: 'Firebase', percent: 20 }
      ],
      img: './assets/images/join.png',
      link: 'https://www.youtube.com/watch?v=KKCSwOVudMo'
    },
    {
      key: 'el-pollo-loco',
      source: 'https://rahmi-esen.developerakademie.net/El_Pollo_Loco/index.html',
      technologies: [
        { name: 'JavaScript', percent: 50 },
        { name: 'CSS', percent: 30 },
        { name: 'HTML', percent: 20 }
      ],
      img: './assets/images/game.png',
      link: 'https://rahmi-esen.developerakademie.net/El_Pollo_Loco/index.html'
    },
/*     {
      key: 'pokedex',
      source: 'https://github.com/RahmiEsen/Portfolio',
      technologies: [
        { name: 'JavaScript', percent: 45 },
        { name: 'CSS', percent: 25 },
        { name: 'HTML', percent: 20 },
        { name: 'API', percent: 10 }
      ],
      img: './assets/images/poke.png',
      link: 'https://www.youtube.com/watch?v=KKCSwOVudMo'
    } */
  ];
  
  constructor(
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef
  ) {}
  
  ngAfterViewInit(): void {
    this.loadTranslations();
    this.setupHoverTracking();
  }
  
  private loadTranslations(): void {
    this.translate.get(['projects.open', 'projects.viewSource']).subscribe(translations => {
      this.defaultText = translations['projects.open'];
      this.viewSourceText = translations['projects.viewSource'];
      this.openText = this.defaultText;
      this.cdRef.detectChanges();
    });
    this.translate.onLangChange.subscribe(() => this.loadTranslations());
  }
  
  private setupHoverTracking(): void {
    const srcElements = document.querySelectorAll('.src');
    const projectCards = document.querySelectorAll('.project-card');

    srcElements.forEach((src) => {
      src.addEventListener('mousemove', (e) => this.showBox(e as MouseEvent, this.viewSourceText));
      src.addEventListener('mouseleave', () => this.hideBox());
    });

    projectCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => this.showBox(e as MouseEvent, this.defaultText));
      card.addEventListener('mouseleave', () => this.hideBox());
    });
  }
  
  private showBox(event: MouseEvent, text: string): void {
    const el = this.openRef.nativeElement as HTMLElement;
    this.openText = text;
    el.style.left = `${event.clientX}px`;
    el.style.top = `${event.clientY}px`;
    el.style.opacity = '1';
    el.style.transform = 'translate(20px, 20px) scale(1)';
  }
  
  private hideBox(): void {
    const el = this.openRef.nativeElement as HTMLElement;
    el.style.opacity = '0';
    el.style.transform = 'translate(10px, 10px) scale(0)';
  }
}