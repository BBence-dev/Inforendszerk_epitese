import { Component } from '@angular/core';
import { Dvd } from 'src/app/models/dvd.model';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-add-dvd',
  templateUrl: './add-dvd.component.html',
  styleUrls: ['./add-dvd.component.css']
})
export class AddDvdComponent {

  condition: any = ['szabad', 'kikolcsönzött', 'selejtezett'];

  dvd: Dvd = {
    cim: '',
    beDatum: new Date,
    sorszam:'',
    condition:''
    };

  // submitted változó inicializálása hamis értékkel
  submitted = false;

  constructor(private dvdService: DvdService) { }

  // A tutoriál mentését végző függvény
  savedvd(): void {
    // Adatok összeállítása az űrlap mezőiből
    const data = {
      cim: this.dvd.cim,
      beDatum: this.dvd.beDatum,
      sorszam: this.dvd.sorszam,
      condition: this.dvd.condition,
    };

    // dvdService segítségével a dvdService.create metódust hívjuk meg, hogy létrehozzunk egy új tutoriált
    // Az Observable-t visszaadó create metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, és a választ kiírjuk a konzolra
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírjuk a konzolra
    this.dvdService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  // Az űrlapban megadott adatok törlése és a submitted változó visszaállítása
  newdvd(): void {
    this.submitted = false;
    this.dvd = {
      cim: '',
      beDatum: new Date,
      sorszam:'',
      condition:'',
      user:''
    };
  }
}
