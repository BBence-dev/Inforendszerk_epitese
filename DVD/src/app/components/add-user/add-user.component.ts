import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  // user objektum inicializálása üres értékekkel
  user: User = {
    nev: '',
    telsz: 0,
    igsz:'',
    lakcim:'',
    condition:false
    };

  // submitted változó inicializálása hamis értékkel
  submitted = false;

  constructor(private userService: UserService) { }

  // A tutoriál mentését végző függvény
  saveuser(): void {
    // Adatok összeállítása az űrlap mezőiből
    const data = {
      nev: this.user.nev,
      telsz: this.user.telsz,
      igsz: this.user.igsz,
      lakcim: this.user.lakcim
    };

    // userService segítségével a userService.create metódust hívjuk meg, hogy létrehozzunk egy új tutoriált
    // Az Observable-t visszaadó create metódusra feliratkozunk a subscribe() segítségével
    // Ha a kérés sikeres, a next callback függvény fut le, és a választ kiírjuk a konzolra
    // Ha hiba történik a kérés során, az error callback függvény fut le, és a hibát kiírjuk a konzolra
    this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  // Az űrlapban megadott adatok törlése és a submitted változó visszaállítása
  newuser(): void {
    this.submitted = false;
    this.user = {
      nev: '',
      telsz: 0,
      igsz:'',
      lakcim:'',
      condition:false
    };
  }
}
