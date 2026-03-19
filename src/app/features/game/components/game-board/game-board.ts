import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import confetti from '@hiseb/confetti';
import { GameService, LetterState } from '../../../../core/services/game.service';
import { GameSummaryDialog } from '../game-summary-dialog/game-summary-dialog';

const MAX_GUESSES = 6;

@Component({
  selector: 'app-game-board',
  imports: [CommonModule],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown)': 'onKeydown($event)', tabindex: '0' },
})
export class GameBoard {
  protected gameService = inject(GameService);
  private dialog = inject(MatDialog);

  guesses$ = this.gameService.guessesSubject;
  currentInput = signal('');

  currentRowLetters = computed<LetterState[]>(() =>
    Array.from({ length: 5 }, (_, i) => ({
      letter: this.currentInput()[i],
      state: 'empty' as const,
    })),
  );

  onKeydown(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Enter' && this.currentInput().length === 5) {
      const won = this.gameService.checkAnswer(this.currentInput());
      this.currentInput.set('');
      if (won) {
        confetti({});
      }
      if (won || this.gameService.guessNumber === MAX_GUESSES) {
        this.dialog.open(GameSummaryDialog, {
          data: {
            won,
            guesses: this.gameService.guessNumber,
            word: this.gameService.selectedWord,
          },
          disableClose: true,
        });
      }
    } else if (key === 'Backspace') {
      this.currentInput.update((v) => v.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && this.currentInput().length < 5) {
      this.currentInput.update((v) => v + key.toUpperCase());
    }
  }
}
