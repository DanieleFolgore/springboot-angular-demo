import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class UserComponent {
  @Input() users: User[] = [];
  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<number>();

  editingId: number | null = null;
  editingUser: User | null = null;

  startEdit(user: User): void {
    this.editingId = user.id;
    this.editingUser = { ...user };
  }

  saveEdit(): void {
    if (this.editingUser) {
      this.edit.emit(this.editingUser);
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingUser = null;
  }

  deleteUser(id: number): void {
    this.remove.emit(id);
  }
}

