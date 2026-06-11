import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up, .fade-left, .fade-right')
      .forEach(el => observer.observe(el));

    // Hero on load — no scroll needed
    document.querySelectorAll('.about-hero .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 120);
    });
  }
}