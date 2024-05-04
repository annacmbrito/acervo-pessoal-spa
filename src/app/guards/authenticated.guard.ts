import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isAuthenticated()) {
    return true;
  }
  inject(Router).navigate(["login"]);
  return false;
};
