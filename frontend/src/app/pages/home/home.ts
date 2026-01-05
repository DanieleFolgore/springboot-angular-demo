import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../../components/user/user';
import { User } from '../../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserComponent, HttpClientModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {   // ⬅️ DEVE chiamarsi Home
  users$: Observable<User[]>;

  constructor(private userService: UserService) {
    this.users$ = this.userService.getUsers();
  }

  create(user: Partial<User>): void {
    const payload: User = { id: 0, username: user.username || '', email: user.email || '' };
    this.userService.createUser(payload).subscribe(() => this.reload());
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


