import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { AuthResponse } from '../../interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent{
  myForm:FormGroup = this.fb.group({
    name: [ 'Marco', [Validators.minLength(2), Validators.required] ],
    email: ['test@test.com', [Validators.email,Validators.required]  ],
    password: ['123456',Validators.minLength(6)]
  });

  constructor(private fb:FormBuilder,private router:Router, private authService:AuthService) { }

  register(){
    
    const { email,password,name} = this.myForm.value;
    console.log("Register");
    
    this.authService.register(email,password,name).subscribe(
      resp => {
        console.log(resp);
        
        if (resp.ok === true)
        {
           //user saved
           this.router.navigateByUrl('/login');

         }
         else {
           Swal.fire('Error', 'There was a problem', 'error');
         }
      }
    );

    
  }

  

}
