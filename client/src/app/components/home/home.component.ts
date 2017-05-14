import { Component, OnInit } from '@angular/core';
import { CdService }  from '../../services/cd.service';
import { Cd } from "../../models/cd";
import { AuthService }  from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome to FF Shop';
  cdList: Cd[];

  constructor(private cdService:CdService, authService: AuthService) {
    this.cdService.getCdList()
      .subscribe(cdList => {this.cdList = cdList});
      // .subscribe(cdList => console.log(cdList[0]))
      // console.log(this.cdList);
  }

  ngOnInit() {
  }

}
