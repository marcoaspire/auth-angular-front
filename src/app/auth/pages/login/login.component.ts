import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  myForm:FormGroup =  this.fb.group({
    email: ['test4@gmail.com', [Validators.email,Validators.required]  ],
    password: ['123456',Validators.minLength(6)]
  });

  constructor(private fb:FormBuilder, private router:Router, private auth:AuthService) { }

  login (){
    console.log(this.myForm.valid);
    console.log(this.myForm.value);
    const { email,password} = this.myForm.value;
    this.auth.login(email,password).subscribe(
      resp => {
        console.log("recieved:");
        
        console.log(resp);
        if (resp.ok===true)
        {
          this.router.navigateByUrl('/dashboard');

        }
        else{
          //TODO: Error msg
          Swal.fire('Error', resp.msg, 'error');
        }
      }
    );
    
   }

}
