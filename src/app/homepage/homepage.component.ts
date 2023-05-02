import { CustomerService } from './../services/api/customer.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[CustomerService]
})
export class HomepageComponent implements OnInit {

  // saleCount: number;
  // userCount: number;
  // totalAmount: number;

  remainingScreenHeight:any;

  constructor() { }

  ngOnInit(): void {
    this.remainingScreenHeight = window.innerHeight -56;
  }
  
}


