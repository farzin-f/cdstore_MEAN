import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import { Cd } from "../../models/cd";
import { CdService }  from '../../services/cd.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  title = 'Add a new CD to your collection';
  cd: Cd;
  //cdList: Cd[];

  constructor(private cdService: CdService) { }

  addCd(f: NgForm){
    let newCd: Cd;
    newCd = f.value;
    //console.log('add: ' + JSON.stringify(newCd));
    this.cdService.addCd(newCd).subscribe(
    () => {}, err => console.log(err));
  }

  ngOnInit() {
  }

}
