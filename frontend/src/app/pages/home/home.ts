import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  stats = [
    { number: '50+', label: 'Venues Listed' },
    { number: '15+', label: 'Areas Covered' },
    { number: '500+', label: 'Events Hosted' },
    { number: '98%', label: 'Happy Clients' },
  ];

  features = [
    { icon: '🗺️', title: 'Area-wise Search', desc: 'North Nazimabad, Gulshan, DHA — apne area ke venues filter karo seconds mein.' },
    { icon: '💰', title: 'Budget Filter', desc: 'PKR 20,000 se leke 5 lakh tak — apne budget mein best options dekho.' },
    { icon: '📅', title: 'Instant Booking', desc: 'Physically jane ki zaroorat nahi — web se booking request bhejo.' },
    { icon: '✅', title: 'Verified Venues', desc: 'Har venue manually verified hai — koi fraud nahi, koi surprise nahi.' },
  ];
}