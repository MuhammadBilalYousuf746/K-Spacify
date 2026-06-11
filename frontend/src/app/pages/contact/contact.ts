import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  details = [
    {
      icon: '📍',
      label: 'Location',
      value: 'Gulshan-e-Iqbal, Karachi, Pakistan'
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+92 300 1234567'
    },
    {
      icon: '✉️',
      label: 'Email',
      value: 'hello@kspacify.com'
    },
    {
      icon: '🕐',
      label: 'Hours',
      value: 'Mon – Sat: 9am – 8pm'
    }
  ];
}