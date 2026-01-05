import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserComponent } from '../../components/user/user';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserComponent, HttpClientModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {   // ⬅️ DEVE chiamarsi Home
  users$: Observable<User[]>;
  newUser: Partial<User> = {};

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  create(form: NgForm): void {
    const payload: Partial<User> = {
      username: this.newUser.username || '',
      email: this.newUser.email || ''
    };

    this.userService.createUser(payload).subscribe({
      next: () => {
        this.reload();
        this.newUser = {};
        form.resetForm();
      },
      error: (err) => {
        console.error('Create user failed', err);
        alert('Creazione utente fallita: ' + (err?.message || err));
      }
    });
  }

  update(user: User): void {
    this.userService.updateUser(user.id, user).subscribe(() => this.reload());
  }

  delete(id: number): void {
    this.userService.deleteUser(id).subscribe(() => this.reload());
  }

  private reload(): void {
    this.users$ = this.userService.getUsers();
  }
}


