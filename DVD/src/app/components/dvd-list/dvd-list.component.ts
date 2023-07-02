import { Component } from '@angular/core';
import { Dvd } from 'src/app/models/dvd.model';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-list',
  templateUrl: './dvd-list.component.html',
  styleUrls: ['./dvd-list.component.css']
})
export class DvdListComponent {

   dvds?: Dvd[];
  
   currentdvd: Dvd = {};
 
   currentIndex = -1;
 
   // A keresés címe
   nev = '';
 
   constructor(private dvdService: DvdService) { }
 
   ngOnInit(): void {
     this.retrievedvds();
   }
 
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

   refreshList(): void {
     this.retrievedvds();
     this.currentdvd = {};
     this.currentIndex = -1;
   }
 
   setActivedvd(dvd: Dvd, index: number): void {
     this.currentdvd = dvd;
     this.currentIndex = index;
   }
 
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
