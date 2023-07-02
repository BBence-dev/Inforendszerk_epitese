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

  @Input() currentdvd:Dvd = {
    cim: '',
    beDatum: new Date,
    sorszam:'',
    condition:'',
    user:'',
    createdAt: '',
    updatedAt: ''
  };
  
 
  message = '';
 Dvd: any;

  constructor(
    private dvdService:DvdService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getdvd(this.route.snapshot.params["id"]);
    }
  }

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

  updatedvd(): void {
    this.message = '';
    
    this.dvdService.update(this.currentdvd.id, this.currentdvd)
    .subscribe({
    next: (res) => {
    console.log(res);
    this.message = res.message ? res.message : 'ThisDvd was updated successfully!';
    },
    error: (e) => console.error(e)
    });
    }
    
  deletedvd(): void {
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
