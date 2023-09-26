import { Injectable } from '@angular/core';
import { HousingLocation } from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  url = 'http://localhost:3000/locations';

  constructor() { }

  // readonly baseUrl = '/assets/images' ;
  // housingLocationList : HousingLocation[] = [
  //   {
  //     id : 1,
  //       name:"Test Home1",
  //       city:"Hyderabad",
  //       state:"ST1",
  //       photo: `${this.baseUrl}/home1.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },
  //   {
  //     id : 2,
  //       name:"Test Home2",
  //       city:"Bangalore",
  //       state:"ST2",
  //       photo: `${this.baseUrl}/home2.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 3,
  //       name:"Test Home3",
  //       city:"Hyderabad",
  //       state:"ST3",
  //       photo: `${this.baseUrl}/home3.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 4,
  //       name:"Test Home4",
  //       city:"Bangalore",
  //       state:"ST4",
  //       photo: `${this.baseUrl}/home4.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 5,
  //       name:"Test Home5",
  //       city:"Kolkata",
  //       state:"ST5",
  //       photo: `${this.baseUrl}/home5.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 6,
  //       name:"Test Home6",
  //       city:"Hyderabad",
  //       state:"ST",
  //       photo: `${this.baseUrl}/home6.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 7,
  //       name:"Test Home7",
  //       city:"Bangalore",
  //       state:"ST7",
  //       photo: `${this.baseUrl}/home7.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 8,
  //       name:"Test Home8",
  //       city:"Hyderabad",
  //       state:"ST8",
  //       photo: `${this.baseUrl}/home8.jpg` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },{
  //     id : 9,
  //       name:"Test Home9",
  //       city:"Kolkata",
  //       state:"ST9",
  //       photo: `${this.baseUrl}/home9.webp` ,
  //       availableUnits: 99 ,
  //       wifi:true,
  //       laundry : false,
  //   },
  // ]



  // getAllHousingLocations(): HousingLocation [] {
  //     return this.housingLocationList;
  // }
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  // getHousingLocationById( id: number) :HousingLocation | undefined {
  //   return this.housingLocationList.find(housingLocation => housingLocation.id == id);
  // }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(firstName:string, lastName: string , email:string){
    console.log(`Home application received : firstName : ${firstName}, lastName : ${lastName} , email: ${email}`)
  }
}
