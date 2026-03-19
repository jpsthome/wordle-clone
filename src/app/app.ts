import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameBoard } from './features/game/components/game-board/game-board';

@Component({
  selector: 'app-root',
  imports: [GameBoard],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
