import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dvd } from 'src/app/models/dvd.model';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-dvd-details',
  templateUrl: './dvd-details.component.html',
  styleUrls: ['./dvd-details.component.css']
})
export class DvdDetailsComponent {

  
  condition: any = ['szabad', 'kikolcsönzött', 'selejtezett'];


  @Input() viewMode = false;

  // Az aktuális tutoriál, amelyet megjelenítünk vagy szerkesztünk
  @Input() currentdvd:Dvd = {
    cim: '',
    beDatum: new Date,
    sorszam:'',
    condition:'',
    user:'',
    createdAt: '',
    updatedAt: ''
  };
  
  // Üzenet, amely a műveletek eredményét jelzi
  message = '';
 Dvd: any;

  constructor(
    private dvdService:DvdService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Az ngOnInit() metódus futása a komponens inicializálásakor
    // Ha nem viewMode-ban vagyunk (nem csak megtekintésre szolgál a komponens), akkor az aktuális tutoriál adatainak lekérése
    if (!this.viewMode) {
      this.message = '';
      this.getdvd(this.route.snapshot.params["id"]);
    }
  }

  // Az aktuális tutoriál adatainak lekérése a megadott azonosító alapján
  getdvd(id: string): void {
    this.dvdService.get(id)
      .subscribe({
        next: (data) => {
          this.currentdvd = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  // A tutoriál frissítése az aktuális tutoriál adataival
  updatedvd(): void {
    this.message = '';

    // ADvdService segítségével frissítjük a tutoriált az aktuális tutori
    // Az Observable-t visszaadó update metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, és üzenetet jelenít meg
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírja a konzolra
    this.dvdService.update(this.currentdvd.id, this.currentdvd)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.message = res.message ? res.message : 'ThisDvd was updated successfully!';
    },
    error: (e) => console.error(e)
    });
    }
    
    // A tutoriál törlése
    deletedvd(): void {
    // ADvdService segítségével töröljük a tutoriált az aktuális tutoriál azonosítója alapján
    // Az Observable-t visszaadó delete metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, átirányítunk az '/dvds' útvonalra
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírja a konzolra
    this.dvdService.delete(this.currentdvd.id)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.router.navigate(['/Dvds']);
    },
    error: (e) => console.error(e)
    });
    }
    

}
