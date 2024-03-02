import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  sayHi = 'Hi welcome';

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null),
        email: new FormControl('null@gmail.com'),
      }),
      gender: new FormControl('male'),
      family: new FormArray([]),
    });
    this.signupForm.patchValue({
      userData: { username: 'example username' },
    });
  }
  onSubmit() {
    console.log(this.signupForm);
  }
  addFamily() {
    const controls = new FormControl(null);
    (<FormArray>this.signupForm.get('family'))?.push(controls);
  }

  get castedarraycontrols() {
    return (<FormArray>this.signupForm.get('family')).controls;
  }
  reset() {
    this.signupForm.reset();
  }
}
