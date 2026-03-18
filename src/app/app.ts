import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { GameService } from './services/game-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('wordle-clone');

  private gameService = inject(GameService);
  guesses$ = this.gameService.guessesSubject;

  guessCtrl = new FormControl();

  submitGuess() {
    this.gameService.checkAnswer(this.guessCtrl.value);
    this.guessCtrl.reset();
  }
}
