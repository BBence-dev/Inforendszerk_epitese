import { Component } from '@angular/core';
import { Dvd } from 'src/app/models/dvd.model';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css']
})
export class DvdListComponent {

   // A dvd objektumok tömbje
   dvds?: Dvd[];

   // Az aktuális tutoriál, amelyet kiválasztottunk
   currentdvd: Dvd = {};
 
   // Az aktuális tutoriál indexe a tömbben
   currentIndex = -1;
 
   // A keresés címe
   nev = '';
 
   constructor(private dvdService: DvdService) { }
 
   ngOnInit(): void {
     // Az ngOnInit() metódus futása a komponens inicializálásakor
     // Az összes tutoriál lekérése
     this.retrievedvds();
   }
 
   // Az összes tutoriál lekérése
   retrievedvds(): void {
     this.dvdService.getAll()
       .subscribe({
         next: (data) => {
           this.dvds = data;
           console.log(data);
         },
         error: (e) => console.error(e)
       });
   }
 
   // Lista frissítése
   refreshList(): void {
     this.retrievedvds();
     this.currentdvd = {};
     this.currentIndex = -1;
   }
 
   // Kiválasztott tutoriál beállítása
   setActivedvd(dvd: Dvd, index: number): void {
     this.currentdvd = dvd;
     this.currentIndex = index;
   }
 
   // Az összes tutoriál törlése
   removeAlldvds(): void {
     this.dvdService.deleteAll()
       .subscribe({
         next: (res) => {
           console.log(res);
           this.refreshList();
         },
         error: (e) => console.error(e)
       });
   }
 
   // Cím alapján történő keresés
   searchTitle(): void {
     this.currentdvd = {};
     this.currentIndex = -1;
 
     this.dvdService.findByTitle(this.nev)
       .subscribe({
         next: (data) => {
           this.dvds = data;
           console.log(data);
         },
         error: (e) => console.error(e)
       });
   }

}
