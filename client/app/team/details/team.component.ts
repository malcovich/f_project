import { Component, OnInit } from '@angular/core';

import { TeamService } from '../../services/teams.service';
import { AuthService} from '../../services/auth.service';
import { ToastComponent } from '../../shared/toast/toast.component';
import { User} from '../../shared/models/user.model';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit {

  user: User;
  team: any; //add model for Team
  isLoading = true;

  constructor(private teamService: TeamService,
              private authService: AuthService,
              public toast: ToastComponent) { }
  

  ngOnInit() {
    this.user  = this.authService.currentUser;
    console.log(this.user)
    this.getTeam();
  }

  getTeam() {
    this.teamService.getMyTeam(this.user._id).subscribe(
      data => {
        this.team = data;
        console.log(this.team)},
      error => console.log(error),
      () => this.isLoading = false
    );
  }
}
