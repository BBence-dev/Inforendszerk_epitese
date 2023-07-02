import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Dvd } from 'src/app/models/dvd.model';
import { DvdService } from 'src/app/services/dvd.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

   dvds?: Dvd[];

   currentdvd: Dvd = {};
 
   currentIndex = -1;
 
   cim = '';
 
  @Input() viewMode = false;

  @Input() currentUser: User = {
    nev: '',
    telsz: 0,
    igsz:'',
    lakcim:'',
    condition:false,
    dvd:'',
    createdAt: '',
    updatedAt: ''
  };
  
  message = '';
  user: any;
dvd: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private dvdService: DvdService) { }

  ngOnInit(): void {

    if (!this.viewMode) {
      this.message = '';
      this.getuser(this.route.snapshot.params["id"]);
    }

    this.retrievedvds();
  }

  setActivedvd(dvd: Dvd, index: number): void {
    this.currentdvd = dvd;
    this.currentIndex = index;
  }

  getuser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      nev: this.currentUser.nev,
      telsz: this.currentUser.telsz,
      igsz: this.currentUser.igsz,
      lakcim: this.currentUser.lakcim,
      dvd: this.currentUser.dvd,
      condition:status
    };

    this.message = '';

   this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentUser.condition = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  updateuser(): void {
    this.message = '';

   this.userService.update(this.currentUser.id, this.currentUser)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.message = res.message ? res.message : 'This user was updated successfully!';
    },
    error: (e) => console.error(e)
    });
    }
    
    deleteuser(): void {
    this.userService.delete(this.currentUser.id)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.router.navigate(['/Users']);
    },
    error: (e) => console.error(e)
    });
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
  
    // Lista frissítése
    refreshList(): void {
      this.retrievedvds();
      this.currentdvd = {};
      this.currentIndex = -1;
    }
    
    }