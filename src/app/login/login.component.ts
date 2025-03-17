import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin: boolean = true;
  loginData = {
    email: '',
    number: '',
    password: ''
  };

  signupData = {
    username: '',
    email: '',
    number: '',
    password: ''
  };

  constructor(private toastr: ToastrService, private router: Router) { }
  Signup_Login_click() {
    this.isLogin = !this.isLogin;
  }
  signup() {
    console.log('876543w567890-');
    
    // Step 1: Check if all fields are filled
    if (!this.signupData || !this.signupData.username || !this.signupData.email || !this.signupData.password) {
      this.toastr.error('All fields are required!', 'Error');
      return; // STOP execution
    }

    // Step 2: Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.signupData.email)) {
      this.toastr.error('Invalid email format!');
      return; // STOP execution
    }

    // Step 3: Validate password (at least 6 characters, includes letter & number)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(this.signupData.password)) {
      this.toastr.error('Password must be at least 6 characters and include a number.');
      return; // STOP execution
    }

    // Step 4: Get existing users or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Step 5: Check if email already exists
    if (users.some((user: any) => user.email === this.signupData.email)) {
      this.toastr.error('Email is already registered!');
      return; // STOP execution
    }

    this.toastr.success('Signup successful! You can now log in.');
    setTimeout(() => {
      const newUser = {
        username: this.signupData.username,
        email: this.signupData.email,
        password: this.signupData.password
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users)); // Store in localStorage
      console.log('User successfully stored in localStorage:', JSON.parse(localStorage.getItem('users')!));
      this.isLogin = true;
    }, 1000); 
  }

  login() {
    if (!this.loginData || !this.loginData.email || !this.loginData.password) {
      this.toastr.error('Both email and password are required!');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(this.loginData.email)) {
      this.toastr.error('Invalid email format!');
      return;
    }
    if (this.loginData.password.length < 6) {
      this.toastr.error('Password must be at least 6 characters long.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.loginData.email && u.password === this.loginData.password);

    if (user) {
      this.toastr.success('Welcome, Login successful.');
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('Invalid email or password!');
    }
  }
}
