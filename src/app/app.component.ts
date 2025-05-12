import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    AboutMeComponent,
    MyProjectsComponent,
    WrapperComponent,
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