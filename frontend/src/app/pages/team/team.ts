import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team implements AfterViewInit {
  members = [
    {
      name: 'Muhammad Bilal Yousuf',
      role: 'Founder & Full Stack Developer',
      bio: 'Software Engineering student at SZABIST Karachi. Proficient Full Stack Developer specializing in the MERN stack along with experience in Angular.',
      linkedin: 'https://linkedin.com/in/m-bilalyousuf-se',
      github: 'https://github.com/MuhammadBilalYousuf746',
      image: 'bilal.jfif', // Fixed path for public folder root
      castLabel: 'Full Stack'
    },
    {
      name: 'Muhammad Ramiq Khan',
      role: 'Co-Founder & Backend Developer',
      bio: 'Software Engineering student at SZABIST Karachi. Specializing in high-performance backend systems and scalable database architecture.',
      linkedin: 'https://linkedin.com/in/ramiqkhan',
      github: 'https://github.com/ramiqkhan',
      image: 'ramiqq.jpg', // Fixed path for public folder root
      castLabel: 'Backend'
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-up, .fade-left')
      .forEach(el => observer.observe(el));

    document.querySelectorAll('.team-hero .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 120);
    });
  }
}