import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    { path: 'login', component: SignInComponent },
    { path: 'livros', component: BookListComponent, canActivate: [authenticatedGuard] },
    { path: '**', redirectTo: 'login' }
];
