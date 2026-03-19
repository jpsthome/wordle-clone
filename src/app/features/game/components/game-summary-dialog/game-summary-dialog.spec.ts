import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GameSummaryDialog, GameSummaryData } from './game-summary-dialog';

describe('GameSummaryDialog', () => {
  let fixture: ComponentFixture<GameSummaryDialog>;
  let component: GameSummaryDialog;

  function setup(data: GameSummaryData) {
    TestBed.configureTestingModule({
      imports: [GameSummaryDialog],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(GameSummaryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should show win message with guess count', () => {
    setup({ won: true, guesses: 3, word: 'APPLE' });
    const content: HTMLElement = fixture.nativeElement;
    expect(content.textContent).toContain('You won!');
    expect(content.textContent).toContain('3 guesses');
  });

  it('should use singular "guess" for a single guess', () => {
    setup({ won: true, guesses: 1, word: 'APPLE' });
    const content: HTMLElement = fixture.nativeElement;
    expect(content.textContent).toContain('1 guess');
    expect(content.textContent).not.toContain('1 guesses');
  });

  it('should show loss message with the correct word', () => {
    setup({ won: false, guesses: 6, word: 'APPLE' });
    const content: HTMLElement = fixture.nativeElement;
    expect(content.textContent).toContain('Game over');
    expect(content.textContent).toContain('APPLE');
  });
});
