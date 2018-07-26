import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchService } from "../services/search.service";

@Component({
  selector: 'app-team-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit{
  form: FormGroup;
  FIRSTWORDS = [{value: "Кто"}, {value: "Сколько"}];
  isLoading = true;
  player: any;

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
          this.player = data;
        },
        error => console.log(error),
        () => this.isLoading = false
      );
    }
  }

  preparingString() {
    let words = this.form.get('searchQ').value.split(' ');
  }

}
