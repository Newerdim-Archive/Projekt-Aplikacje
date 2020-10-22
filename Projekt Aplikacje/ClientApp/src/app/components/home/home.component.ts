import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quotes = [
    'Krytykować, potępiać i narzekać potrafi każdy głupiec – i większość głupców tak robi. Ale aby zrozumieć i darować, potrzeba charakteru i samokontroli.',
    'Początek jest najważniejszą częścią pracy'
  ];

  months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecien',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Paździenik',
    'Listopad',
    'Grudzień'
  ]

  constructor() { }

  ngOnInit(): void {

  }

  todayDate() {
    let date = new Date();
    return `${date.getDate()} ${this.months[date.getMonth()]}`;
  }

  randomQuote() {
    return this.quotes[Math.floor(Math.random() * (this.quotes.length - 1))];
  }

}
