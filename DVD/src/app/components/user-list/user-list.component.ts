import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  // A User objektumok tömbje
  Users?: User[];

  // Az aktuális tutoriál, amelyet kiválasztottunk
  currentUser: User = {};

  // Az aktuális tutoriál indexe a tömbben
  currentIndex = -1;

  // A keresés címe
  nev = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Az ngOnInit() metódus futása a komponens inicializálásakor
    // Az összes tutoriál lekérése
    this.retrieveUsers();
  }

  // Az összes tutoriál lekérése
  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe({
        next: (data) => {
          this.Users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // Lista frissítése
  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = {};
    this.currentIndex = -1;
  }

  // Kiválasztott tutoriál beállítása
  setActiveUser(User: User, index: number): void {
    this.currentUser = User;
    this.currentIndex = index;
  }

  // Az összes tutoriál törlése
  removeAllUsers(): void {
    this.userService.deleteAll()
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
    this.currentUser = {};
    this.currentIndex = -1;

    this.userService.findByTitle(this.nev)
      .subscribe({
        next: (data) => {
          this.Users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
