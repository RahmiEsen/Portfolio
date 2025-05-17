import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})

export class FeedbackComponent {
  hoverIndex: number | null = null;
  
  cards = [
    {
      title: 'T. Schulz',
      text: `Working with Rahmi was a real stroke of luck for me. He not only brings technical expertise but also a high level of empathy, structure, and professionalism. No matter how complex the project was, Rahmi always kept an overview and delivered reliable results.`,
      userName: 'Team Partner',
      userImage: './images/join.JPG'
    },
    {
      title: 'E. Fatih',
      text: `If anyone embodies the word "reliability", it's Rahmi. He's analytical, solution-oriented, and always open to new ideas. His sense of aesthetics and usability sets him apart from many other developers. It was a pleasure working with him.`,
      userName: 'Rayvclo',
      userImage: './images/rayvclo.jpg'
    },
    {
      title: 'J. Roth',
      text: `Rahmi impresses not only with his professional skills but also with his exceptional dedication. He's always one step ahead, contributes creative solutions, and remains focused and team-oriented. Working with him was truly enriching for me.`,
      userName: 'Team Partner',
      userImage: './images/join.JPG'
    }
  ];
  
  animatedCardIndex: number | null = null;
  activeCardIndex = 0;
  
  nextCard() {
    this.animatedCardIndex = this.cards.length - 1;
    this.activeCardIndex = (this.activeCardIndex + 1) % this.cards.length;
    setTimeout(() => {
      const last = this.cards.pop();
      if (last) this.cards.unshift(last);
      this.animatedCardIndex = null;
    }, 600);
  }
  
  getDotIndex(i: number): number {
    return this.cards.length - 1 - i;
  }
  
  getCardStyle(index: number): any {
    return {
      transform: this.getTransform(index),
      opacity: this.getOpacity(index),
      zIndex: this.getZIndex(index),
      pointerEvents: this.getPointerEvents(index),
      transition: this.getTransition(index)
    };
  }
  
  private isHovered(index: number): boolean {
    return this.hoverIndex === index;
  }
  
  private isAnimating(index: number): boolean {
    return this.animatedCardIndex === index;
  }
  
  private getTransform(index: number): string {
    return this.isAnimating(index)
      ? this.getAnimationTransform()
      : this.getBaseTransform(index);
  }
  
  private getBaseTransform(index: number): string {
    const isMobile = window.innerWidth <= 768;
    const translateX = isMobile ? index * 10 : index * 27;
    const translateZ = isMobile ? index * 15 : index * 30;
    const offsetY = (isMobile ? index * 35 : index * 47) + (this.isHovered(index) ? -15 : 0);
    return `
      rotateY(26deg)
      translateX(${translateX}px)
      translateZ(${translateZ}px)
      translateY(${offsetY}px)
    `;
  }
  
  private getAnimationTransform(): string {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      return `
        rotateY(26deg)
        translateX(20px)
        translateZ(110px)
        translateY(110px)
      `;
    } else {
      return `
        rotateY(26deg)
        translateX(50px)
        translateZ(300px)
        translateY(200px)
      `;
    }
  }
  
  private getOpacity(index: number): number {
    return this.isAnimating(index) ? 0 : 1;
  }
  
  private getZIndex(index: number): number {
    return this.isAnimating(index) ? 9999 : index + 1;
  }
  
  private getPointerEvents(index: number): string {
    return this.isAnimating(index) ? 'none' : 'auto';
  }
  
  private getTransition(index: number): string {
  if (this.isAnimating(index)) {
    return 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
  }
    return 'transform 0.3s ease-in-out, opacity 0.6s ease-in-out';
  }
}