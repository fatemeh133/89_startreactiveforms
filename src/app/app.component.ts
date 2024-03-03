import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  sayHi = 'Hi welcome';
  filteredText: string;
  filteredname: string;
  promis = new Promise((resolve) => {
    setTimeout(() => {
      resolve('online');
    }, 2000);
  });
  reponseArray: any[];
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
    http.get<any[]>(this.url).subscribe({
      next: (response) => {
        console.log(response);
        this.reponseArray = response;
      },
    });
  }
  post(titleInput: HTMLInputElement) {
    const post: any = { title: titleInput.value };

    this.http.post(this.url, JSON.stringify(post)).subscribe({
      next: (res) => {
        post.id = res;
        this.reponseArray.splice(0, 0, post);
      },
    });
  }

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

  // new
  products = [
    {
      type: 'meduim',
      name: 'Desktop Computer',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
    {
      type: 'large',
      name: 'Gaming Laptop',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
    {
      type: 'small',
      name: 'Ultrabook Multimedia',
      status: 'offline',
      started: new Date(15, 1, 2017),
    },
    {
      type: 'small',
      name: 'SSD Hard disk',
      status: 'stable',
      started: new Date(15, 1, 2017),
    },
  ];
  getStatusClasses(server: {
    type: string;
    name: string;
    status: string;
    started: Date;
  }) {
    return {
      'list-group-item-success': server.status === 'stable',
      'list-group-item-warning': server.status === 'offline',
      'list-group-item-danger': server.status === 'critical',
    };
  }
  addProduct() {
    this.products.push({
      type: 'large',
      name: 'Gaming Laptop',
      status: 'offline',
      started: new Date(15, 1, 2017),
    });
  }
}
