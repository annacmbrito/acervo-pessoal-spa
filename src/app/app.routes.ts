import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { BookFormComponent } from './pages/book-form/book-form.component';

export const routes: Routes = [
    { path: 'login', component: SignInComponent },
    { path: 'livros', component: BookListComponent, canActivate: [authenticatedGuard] },
    { path: 'livros/novo', component: BookFormComponent, canActivate: [authenticatedGuard] },
    { path: '**', redirectTo: 'login' }
];
