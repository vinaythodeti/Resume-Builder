import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from '../domain/car';
import { SERVERCONFIG } from '../model/app.constant';

@Injectable()
export class CarService {

     API_BACKEND = `${SERVERCONFIG.BACKEND}/api`;

    constructor(private http: HttpClient) {}

    getCarsSmall() {
        return this.http.get<any>('assets/data/cars-small.json')
            .toPromise()
            .then(res => <Car[]> res.data)
            .then(data => data);
    }
    getStates() {
        return this.http.get<any>('../../../assets/data/states-districts.json')
            .toPromise()
            .then(res => <any>res.states)
            .then(states => states);
    }

    getCountryCodes(){
        return this.http.get<any>('../../../assets/data/country-codes.json')
            .toPromise()
            .then(res=>res.countries)
            .then(countries=>countries);
    }
}
