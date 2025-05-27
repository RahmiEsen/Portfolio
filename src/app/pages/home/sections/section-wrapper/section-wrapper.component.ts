import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { GsapAnimatorService } from '../../../../shared/gsap-animator.service';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.scss']
})

export class SectionWrapperComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) container!: ElementRef;
  
  constructor(private animator: GsapAnimatorService) {}
  
  ngAfterViewInit(): void {
    this.animator.fadeInUp(this.container);
  }
}