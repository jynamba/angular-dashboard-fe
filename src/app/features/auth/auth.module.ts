import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, Login, Register],
})
export class AuthModule {}
