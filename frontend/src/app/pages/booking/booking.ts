import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  constructor(private http: HttpClient) {}

  filters = {
    area: '',
    capacity: '',
    budget: '',
    timing: ''
  };

  areas = [
    'Gulshan-e-Iqbal', 'North Nazimabad', 'DHA', 'Clifton',
    'Nazimabad', 'PECHS', 'Bahadurabad', 'Johar'
  ];

  timings = ['Morning', 'Evening', 'Full Day'];

  venues: any[] = [];
  loading = false;
  searched = false;
  selectedVenue: any = null;
  bookingSuccess = false;
  showReceipt = false;
  lastBooking: any = null;
  bookingError = '';

  bookingForm = {
    name: '',
    phone: '',
    email: '',
    date: '',
    numberOfPeople: '',
    timing: '',
    message: ''
  };

  searchVenues() {
    this.loading = true;
    this.searched = true;
    this.selectedVenue = null;

    const params: any = {};
    if (this.filters.area) params.area = this.filters.area;
    if (this.filters.capacity) params.capacity = this.filters.capacity;
    if (this.filters.budget) params.budget = this.filters.budget;
    if (this.filters.timing) params.timing = this.filters.timing;

    this.http.get<any[]>('http://localhost:5000/api/venues', { params })
      .subscribe({
        next: (data) => {
          this.venues = data;
          this.loading = false;
        },
        error: () => { this.loading = false; }
      });
  }

  selectVenue(venue: any) {
    this.selectedVenue = venue;
    this.bookingError = '';
    this.bookingForm.timing = this.filters.timing || '';
    setTimeout(() => {
      document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  generateReceiptId(): string {
    return 'KSP-' + Date.now().toString().slice(-6);
  }

  submitBooking() {
    if (!this.bookingForm.name || !this.bookingForm.phone ||
        !this.bookingForm.date || !this.bookingForm.numberOfPeople ||
        !this.bookingForm.timing) {
      this.bookingError = 'Sare required fields fill karo *';
      return;
    }

    this.bookingError = '';
    const payload = {
      ...this.bookingForm,
      venueId: this.selectedVenue._id,
      numberOfPeople: Number(this.bookingForm.numberOfPeople)
    };

    this.http.post<any>('http://localhost:5000/api/bookings', payload)
      .subscribe({
        next: () => {
          this.lastBooking = {
            receiptId: this.generateReceiptId(),
            name: this.bookingForm.name,
            phone: this.bookingForm.phone,
            email: this.bookingForm.email,
            date: this.bookingForm.date,
            numberOfPeople: this.bookingForm.numberOfPeople,
            timing: this.bookingForm.timing,
            message: this.bookingForm.message,
            venueName: this.selectedVenue.name,
            venueArea: this.selectedVenue.area,
            venueAddress: this.selectedVenue.address,
            pricePerDay: this.selectedVenue.pricePerDay,
            submittedAt: new Date().toLocaleString('en-PK')
          };
          this.bookingSuccess = true;
          this.showReceipt = true;
          this.selectedVenue = null;
          this.bookingForm = {
            name: '', phone: '', email: '',
            date: '', numberOfPeople: '', timing: '', message: ''
          };
        },
        error: (err) => {
          this.bookingError = err.error?.message || 'Kuch error aaya, dobara try karo.';
        }
      });
  }

  closeReceipt() {
    this.showReceipt = false;
  }

  resetSearch() {
    this.filters = { area: '', capacity: '', budget: '', timing: '' };
    this.venues = [];
    this.searched = false;
    this.selectedVenue = null;
    this.bookingSuccess = false;
    this.showReceipt = false;
    this.lastBooking = null;
    this.bookingError = '';
  }

  printReceipt() {
    window.print();
  }
}