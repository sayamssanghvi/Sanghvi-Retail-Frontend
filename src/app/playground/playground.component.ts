import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  displayPara: boolean;
  count: number;
  logClicks: number[] = [];
  
  constructor() {
    this.displayPara = false;
    this.count = 0;
   }

  ngOnInit(): void {

  }

  Display() {
    this.displayPara = !this.displayPara;
    this.logClicks.push(++this.count);
    console.log(this.logClicks);
  }

  getColor() {
    return this.logClicks.length >= 5 ? 'blue' : 'white';
  }

}
