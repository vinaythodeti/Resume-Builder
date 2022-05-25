import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Car } from './_shared/domain/car';
import { CarService } from './_shared/services/carservice';

export class PrimeCar implements Car {
    constructor(public vin?, public year?, public brand?, public color?) {}
}


@Component({
    selector: 'app-root',
    templateUrl:'./app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = true;
    displayDialog: boolean;
    property:any;

    car: Car = new PrimeCar();

    selectedCar: Car;

    newCar: boolean;

    cars: Car[];

    cols: any[];

    constructor(private carService: CarService,private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        this.primengConfig.ripple = true;
        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }

    showDialogToAdd() {
        this.newCar = true;
        this.car = new PrimeCar();
        this.displayDialog = true;
    }

    save() {
        const cars = [...this.cars];
        if (this.newCar) {
            cars.push(this.car);
        } else {
            cars[this.findSelectedCarIndex()] = this.car;
        }
        this.cars = cars;
        this.car = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedCarIndex();
        this.cars = this.cars.filter((val, i) => i !== index);
        this.car = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newCar = false;
        this.car = {...event.data};
        this.displayDialog = true;
    }

    findSelectedCarIndex(): number {
        return this.cars.indexOf(this.selectedCar);
    }
}
