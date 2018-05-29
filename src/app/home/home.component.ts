import { Component, OnInit } from '@angular/core';
import {trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import { DataService } from '../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('cars',[
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: 0.5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))]), {optional:true}),

          query(':leave', stagger('100ms', [
            animate('.3s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              //style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
            ]))]), {optional:true}),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  moneyCount: number = 10000;
  btnText: string = "Legg til";
  carName: string = ""
  carCostText: string = "";
  cars = [];
  prices = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.car.subscribe(res => this.cars = res);
    //this.moneyCount = this.cars.length;
    this._data.changeGoal(this.cars);
  }

  addItem(){
    /*if (Number(this.carCostText) && this.carName != ""){
      console.log("It works")
      return
    }
*/
    this.cars.push(this.carName);
    this.prices.push(Number(this.carCostText));
    this.moneyCount = this.moneyCount - Number(this.carCostText);
    this.carName = "";
    this.carCostText = "";
    
    //this.moneyCount = this.cars.length;
    this._data.changeGoal(this.cars);
  }
  removeItem(i){
    this.cars.splice(i,1);
    this._data.changeGoal(this.cars);
    this.moneyCount = this.moneyCount + this.prices[i];
  }
}
