import { Component, OnInit } from '@angular/core';
import { UserService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserResolved } from '../UserResolved';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.scss']
})
export class ReposComponent implements OnInit {
  errorMessage: string;
  repos: any[];
  user: string;
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.user = this.route.snapshot.params.user;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      const resolvedData: UserResolved = data['resolvedData'];
      this.repos = resolvedData["repos"];
      this.errorMessage = resolvedData.error;
    });
  }

}
