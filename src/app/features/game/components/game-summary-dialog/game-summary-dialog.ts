import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { GameService } from '../../../../core/services/game.service';

export interface GameSummaryData {
  won: boolean;
  guesses: number;
  word: string;
}

@Component({
  selector: 'app-game-summary-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './game-summary-dialog.html',
  styleUrl: './game-summary-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameSummaryDialog {
  protected data = inject<GameSummaryData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<GameSummaryDialog>);
  private gameService = inject(GameService);

  playAgain() {
    this.gameService.reset();
    this.dialogRef.close();
  }
}
