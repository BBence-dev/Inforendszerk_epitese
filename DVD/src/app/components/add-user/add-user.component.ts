import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
 
  user: User = {
    nev: '',
    telsz: 0,
    igsz:'',
    lakcim:'',
    condition:false
    };
    submitted = false;

  constructor(private userService: UserService) { }

   saveuser(): void {
       const data = {
      nev: this.user.nev,
      telsz: this.user.telsz,
      igsz: this.user.igsz,
      lakcim: this.user.lakcim
    };

  this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

 
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
