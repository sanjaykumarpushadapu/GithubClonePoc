import { UserService } from '../users.service';
import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('userSearchInput', { static: true }) userSearchInput: ElementRef;
  userslist: any;
  errorMessage: string;
  userFilter: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    //init users 
    this.getUsers();

    //apply serach filter 
    fromEvent(this.userSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // Time in milliseconds between key events
      , debounceTime(500)

      // If previous query is diffent from current   
      , distinctUntilChanged()

      // subscription for response
    ).subscribe((username: string) => {
      username.length > 0 ? this.SearchUser(username) : this.getUsers();
    });


  }
  getUsers(): void {
    //get all users 
    this.userService.getUsers().subscribe({
      next: users => {
        this.userslist = users;
      },
      error: err => this.errorMessage = err
    });

  }
  SearchUser(username): void {
    let newuser = [];
    //get user by user name 
    this.userService.getUsersByUserName(username).subscribe({
      next: user => {
        newuser.push(user);
        this.userslist = newuser;
      },
      error: err => this.errorMessage = err
    });
  }
}
