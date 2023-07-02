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

  
  submitted = false;

  constructor(private dvdService: DvdService) { }

  
  savedvd(): void {
   
    const data = {
      cim: this.dvd.cim,
      beDatum: this.dvd.beDatum,
      sorszam: this.dvd.sorszam,
      condition: this.dvd.condition,
    };

   
    this.dvdService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  
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
