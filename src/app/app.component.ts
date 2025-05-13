import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { AboutMeComponent } from './features/about-me/about-me.component';
import { MyProjectsComponent } from './features/my-projects/my-projects.component';
import { SectionWrapperComponent } from './shared/section-wrapper/wrapper.component';
import { FeedbackComponent } from './features/feedback/feedback.component';
import { TechStackComponent } from './features/tech-stack/tech-stack.component';
import { ContactComponent } from './features/contact/contact.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GoTopComponent } from './layout/go-top/go-top.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    AboutMeComponent,
    MyProjectsComponent,
    SectionWrapperComponent,
    TechStackComponent,
    FeedbackComponent,
    ContactComponent,
    FooterComponent,
    GoTopComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'Portfolio';
}