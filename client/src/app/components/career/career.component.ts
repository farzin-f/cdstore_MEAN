import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})

export class CareerComponent implements OnInit {
  title = "We were looking for you!";
  uploadFiles: any[];
  uploadProgresses: any[] = [];
  zone: NgZone;
  options: Object = {
    url: 'http://localhost:4000/api/resume'
  };

  constructor() {
    this.zone = new NgZone({ enableLongStackTrace: false });
  }

  handleUpload(data): void {
   let id = data.id;
   let index = this.findIndex(id);
   if (index === -1) {
     this.uploadProgresses.push({id: id, percent: 0});
   }
   if (this.uploadProgresses[index]) {
     this.zone.run(() => {
       this.uploadProgresses[index].percent = data.progress.percent;
     });
   }
 }

 findIndex(id: string): number {
    return this.uploadProgresses.findIndex(x => x.id === id);
  }

  ngOnInit() {
  }

}
