import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  bookings: any[] = [];
  loading = true;
  activeTab = 'all';

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadBookings();
  }

  getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  loadBookings() {
    this.loading = true;
    this.http.get<any[]>('http://localhost:5000/api/bookings', {
      headers: this.getHeaders()
    }).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: () => {
        this.auth.logout();
      }
    });
  }

  get filteredBookings() {
    if (this.activeTab === 'all') return this.bookings;
    return this.bookings.filter(b => b.status.toLowerCase() === this.activeTab);
  }

  get stats() {
    return {
      total: this.bookings.length,
      pending: this.bookings.filter(b => b.status === 'Pending').length,
      approved: this.bookings.filter(b => b.status === 'Approved').length,
      rejected: this.bookings.filter(b => b.status === 'Rejected').length,
    };
  }

  updateStatus(id: string, status: string) {
    this.http.patch(`http://localhost:5000/api/bookings/${id}`,
      { status },
      { headers: this.getHeaders() }
    ).subscribe({
      next: () => this.loadBookings(),
      error: () => alert('Status update failed')
    });
  }

  logout() {
    this.auth.logout();
  }
}