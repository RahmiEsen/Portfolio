import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent {
  contactData = { name: '', mail: '', message: '' };
  nameError: string = '';
  mailError: string = '';
  messageError: string = '';
  successMessage: string = '';
  isFadingOut: boolean = false;
  
  constructor(private http: HttpClient) {}
  
  onSubmit(): void {
    this.validateAllFields();
    if (this.isFormValid()) this.sendToBackend();
  }
  
  validateAllFields(): void {
    this.validateName();
    this.validateMail();
    this.validateMessage();
  }
  
  isFormValid(): boolean {
    return !this.nameError && !this.mailError && !this.messageError;
  }
  
  validateName(): void {
    const name = this.contactData.name.trim();
    this.nameError = name === ''
      ? 'Please enter your name'
      : '';
  }
  
  validateMail(): void {
    const mail = this.contactData.mail.trim();
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mail === '') {
      this.mailError = 'Please enter your email';
    } else if (!pattern.test(mail)) {
      this.mailError = 'Please enter a valid email address';
    } else {
      this.mailError = '';
    }
  }
  
  validateMessage(): void {
    const msg = this.contactData.message.trim();
    if (msg === '') {
      this.messageError = 'Please enter a message';
    } else if (msg.length < 10) {
      this.messageError = 'The message must be at least 10 characters long';
    } else {
      this.messageError = '';
    }
  }
  
  sendToBackend(): void {
    this.http.post('https://rahmiesen.com/sendMail.php', this.contactData)
      .subscribe({
        next: () => {
          this.successMessage = 'Deine Nachricht wurde erfolgreich gesendet.';
          this.contactData = { name: '', mail: '', message: '' };
        },
        error: (err) => {
          console.error('Fehler beim Senden:', err);
        }
      });
  }
  
  handleSuccess(): void {
    this.contactData = { name: '', mail: '', message: '' };
    this.successMessage = '✅ Thank you! Your message has been sent.';
    this.isFadingOut = false;
    this.scheduleFadeOut();
  }
  
  handleError(error: any): void {
    console.error('Senden fehlgeschlagen:', error);
    this.successMessage = '❌ Sending failed. Please try again later.';
    this.isFadingOut = false;
    this.scheduleFadeOut();
  }
  
  scheduleFadeOut(): void {
    setTimeout(() => this.isFadingOut = true, 2600);
    setTimeout(() => this.resetSuccessMessage(), 3000);
  }
  
  resetSuccessMessage(): void {
    this.successMessage = '';
    this.isFadingOut = false;
  }
}