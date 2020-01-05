import { Component, OnInit,Input } from '@angular/core';
import {ApiService} from '../../api.service';
import {User} from '../../Object/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input() users : User[] = [];

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

}
