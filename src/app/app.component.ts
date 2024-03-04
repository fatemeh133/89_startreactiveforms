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
        console.log(this.reponseArray);
      },
    });
  }
  post(titleInput: HTMLInputElement) {
    const post: any = { title: titleInput.value };

    this.http.post(this.url, JSON.stringify(post)).subscribe({
      next: (res: any) => {
        console.log(res.id);

        post.id = res.id;
        this.reponseArray.splice(0, 0, post);
      },
    });
  }
  updatePost(post: any) {
    this.http
      .patch(
        this.url + '/' + post.id,
        JSON.stringify({ title: 'Fateme Aghaahmadi' }),
        {
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          const index = this.reponseArray.indexOf(post);
          this.reponseArray.splice(index, 0, { title: 'Fateme Aghaahmadi' });
        },
      });
  }
  deletePost(post: any) {
    this.http.delete(this.url + '/' + post.id).subscribe({
      next: (res) => {
        console.log(res);

        const index = this.reponseArray.indexOf(post);
        this.reponseArray.splice(index, 1);
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
