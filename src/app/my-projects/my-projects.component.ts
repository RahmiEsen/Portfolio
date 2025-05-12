import {Component,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss'
})

export class MyProjectsComponent implements AfterViewInit {
  technologiesColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Angular: '#dd0031',
    Firebase: '#ffca28',
    API: '#00bcd4',
  };
  
  projects = [
    {
      title: 'Join',
      source: './assets/stack/code.svg',
      technologies: [
        { name: 'Angular', percent: 25 },
        { name: 'TypeScript', percent: 25 },
        { name: 'HTML', percent: 15 },
        { name: 'CSS', percent: 15 },
        { name: 'Firebase', percent: 20 }
      ],
      img: './assets/images/join.png',
      desc: 'Task management tool inspired by the Kanban system, built with Firebase create, organize, and manage tasks using drag-and-drop functionality, assign them to users and categories, and sync everything in real time through the cloud. Perfect for collaborative teams and efficient workflows.',
      link: 'https://www.youtube.com/watch?v=T6eK-2OQtew',
    },
    {
      title: 'El Pollo Loco',
      source: './assets/stack/code.svg',
      technologies: [
        { name: 'JavaScript', percent: 50 },
        { name: 'CSS', percent: 30 },
        { name: 'HTML', percent: 20 }
      ],
      img: './assets/images/game.png',
      desc: 'A fun and fast-paced arcade game built entirely with JavaScript, HTML, and CSS. Control a cartoon chicken using keyboard input, avoid obstacles, and collect points across different levels. Features include smooth animations, responsive layout, and compatibility with both desktop and mobile devices all created without external libraries.',
      link: 'https://www.youtube.com/watch?v=T6eK-2OQtew',
    },
    {
      title: 'Pokédex',
      source: './assets/stack/code.svg',
      technologies: [
        { name: 'JavaScript', percent: 45 },
        { name: 'CSS', percent: 25 },
        { name: 'HTML', percent: 20 },
        { name: 'API', percent: 10 }
      ],
      img: './assets/images/poke.png',
      desc: 'A responsive web app that uses the PokéAPI to display detailed information about various Pokémon. Built with JavaScript, HTML, and CSS, it allows users to search, filter, and explore stats, types, and abilities. The app demonstrates how to integrate APIs and manage real-time data rendering in the browser.',
      link: 'https://www.youtube.com/watch?v=T6eK-2OQtew',
    }
  ];
  openText: string = 'Open';
  
  @ViewChildren('card') cards!: QueryList<ElementRef>;
  
  ngAfterViewInit(): void {
    this.setupOpenBoxTracking();
    this.setupCodeIconTracking();
  }
  
  private setupOpenBoxTracking(): void {
  const openDiv = this.getElement('.open');
  if (!openDiv) return;
  
  const srcElements = document.querySelectorAll('.src');
  const projectCards = document.querySelectorAll('.project-card');
  
  srcElements.forEach((srcEl) => {
    srcEl.addEventListener('mousemove', (event) => {
      this.openText = 'View Code Source';
      this.updateOpenBoxPosition(openDiv, event as MouseEvent);
    });
    
    srcEl.addEventListener('mouseleave', () => {
      this.hideOpenBox(openDiv);
    });
  });
  
  projectCards.forEach((cardEl) => {
    cardEl.addEventListener('mousemove', (event) => {
      this.openText = 'Open';
      this.updateOpenBoxPosition(openDiv, event as MouseEvent);
    });
    
    cardEl.addEventListener('mouseleave', () => {
      this.hideOpenBox(openDiv);
      });
    });
  }
  
  private getElement(selector: string): HTMLElement | null {
    return document.querySelector(selector);
  }
  
  private updateOpenBoxPosition(element: HTMLElement, event: MouseEvent): void {
    element.style.left = `${event.clientX}px`;
    element.style.top = `${event.clientY}px`;
    element.style.opacity = '1';
    element.style.transform = 'translate(20px, 20px) scale(1)';
  }
  
  private hideOpenBox(element: HTMLElement): void {
    element.style.opacity = '0';
    element.style.transform = 'translate(10px, 10px) scale(0)';
  }
  
  private setupCodeIconTracking(): void {
    const codeIcons = document.querySelectorAll('img[src*="code.svg"]');
    const openDiv = this.getElement('.open');
    if (!openDiv || !codeIcons.length) return;
    
    codeIcons.forEach((icon) => {
      icon.addEventListener('mouseenter', () => {
        this.openText = 'View Code Source';
      });
      
      icon.addEventListener('mouseleave', () => {
        this.openText = 'Open';
      });
    });
  }
}