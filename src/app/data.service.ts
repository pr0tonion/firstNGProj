import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private cars = new BehaviorSubject<any>([]);
  car = this.cars.asObservable();

  constructor() {
    
   }

   changeGoal(car){
    this.cars.next(car);
   }

}
