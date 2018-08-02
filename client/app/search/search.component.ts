import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from "../services/search.service";

@Component({
  selector: 'app-team-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{
  form: FormGroup;
  isLoading = true;
  actions: any;

  constructor(private teamService: SearchService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      searchQ: new FormControl("")
    });
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.teamService.getAnswer(this.form.get('searchQ').value).subscribe(
        data => {
          console.log(data)
          this.actions= data;
        },
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

  preparingString() {
    let words = this.form.get('searchQ').value.split(' ');
  }

  returnProstion(player) {
    if (player.position === 'D') {
      return "Захисник"
    }
    if (player.position === 'G') {
      return "Голкіпер"
    }
    if (player.position === 'M') {
      return "Півзахисник"
    }
    if (player.position === 'F') {
      return "Форвард"
    }
  }

}
