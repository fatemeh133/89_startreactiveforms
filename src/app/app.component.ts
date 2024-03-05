import { BadInputError } from './error/badInputError';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpRequstService } from './services/http-requst.service';
import { NotFound } from './error/not-found';

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

  constructor(private service: HttpRequstService) {}
  ngOnInit() {
    this.service.get().subscribe({
      next: (response) => {
        console.log(response);
        this.reponseArray = response;
        console.log(this.reponseArray);
      },
      error: (error: any) => {
        if (error instanceof BadInputError) {
          alert('Not found');
        } else throw error;
      },
    });

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

  post(titleInput: HTMLInputElement) {
    const post: any = { title: titleInput.value };

    this.service.post(post).subscribe({
      next: (res: any) => {
        console.log(res.id);

        post.id = res.id;
        this.reponseArray.splice(0, 0, post);
      },
      error: (error: any) => {
        if (error instanceof BadInputError) {
          alert('400 Bad Request');
        } else throw error;
      },
    });
  }
  updatePost(post: any) {
    this.service.update(post).subscribe({
      next: (res) => {
        console.log(res);

        const index = this.reponseArray.indexOf(post);
        this.reponseArray.splice(index, 0, { title: 'Fateme Aghaahmadi' });
      },
      error: (error: any) => {
        if (error instanceof NotFound) {
          alert('Not found');
        } else throw error;
      },
    });
  }
  deletePost(post: any) {
    this.service.delete(post).subscribe({
      next: (res) => {
        console.log(res);

        const index = this.reponseArray.indexOf(post);
        this.reponseArray.splice(index, 1);
      },
      error: (error: any) => {
        if (error instanceof NotFound) {
          alert('Not found');
        } else throw error;
      },
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
