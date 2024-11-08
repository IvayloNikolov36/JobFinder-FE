import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'jf-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  username: string | null = '';

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }
}
