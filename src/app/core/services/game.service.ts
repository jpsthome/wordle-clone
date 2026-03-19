import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';

const WORDS_LIST = [
  'APPLE', 'BRAVE', 'CHESS', 'CROWN', 'DANCE',
  'EAGLE', 'FLAME', 'GRACE', 'HEART', 'HOUSE',
  'IMAGE', 'JUICE', 'KNIFE', 'LEMON', 'LIGHT',
  'MAGIC', 'MARCH', 'MONEY', 'NIGHT', 'NOBLE',
  'OCEAN', 'OLIVE', 'PEACE', 'PILOT', 'PLACE',
  'PLANT', 'POWER', 'PRIDE', 'QUEEN', 'QUEST',
  'RADAR', 'RANGE', 'RAVEN', 'REALM', 'RIGHT',
  'RIVER', 'ROYAL', 'SAINT', 'SCALE', 'SCENE',
  'SCOUT', 'SHADE', 'SHAKE', 'SHAPE', 'SHARK',
  'SHORE', 'SHORT', 'SKILL', 'SLATE', 'SMALL',
  'SMART', 'SMILE', 'SOLAR', 'SOLID', 'SOUTH',
  'SPACE', 'SPARK', 'SPINE', 'SPORT', 'SQUAD',
  'STAND', 'STARE', 'START', 'STEEL', 'STERN',
  'STILL', 'STOCK', 'STONE', 'STORM', 'STORY',
  'SWIFT', 'SWORD', 'TASTE', 'THICK', 'TIGER',
  'TITLE', 'TORCH', 'TOTAL', 'TOUGH', 'TOWER',
  'TRACK', 'TRAIL', 'TRAIN', 'TREAT', 'TREND',
  'TRIBE', 'TRICK', 'TRUST', 'TRUTH', 'TWICE',
  'ULTRA', 'UNION', 'VALOR', 'VALUE', 'VIVID',
  'WASTE', 'WATER', 'WHALE', 'WHITE', 'WORLD',
];

export interface LetterState {
  letter?: string;
  state: 'wrong' | 'correct' | 'missplaced' | 'empty';
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  selectedWord = faker.helpers.arrayElement(WORDS_LIST);
  guessedWord = '';
  guesses: Array<Array<LetterState>> = Array.from({ length: 6 }, this.createEmptyGuess);
  guessNumber = 0;
  guessesSubject = new BehaviorSubject<Array<Array<LetterState>>>(this.guesses);

  checkAnswer(answer: string): boolean {
    const selectedWordArray = this.selectedWord.split('');
    const guessedWordArray = answer.toUpperCase().split('');
    const answerState: LetterState[] = new Array(guessedWordArray.length);

    // First pass: mark correct letters and track remaining unmatched letters
    const remainingLetters = [...selectedWordArray];
    for (let index = 0; index < guessedWordArray.length; index++) {
      if (guessedWordArray[index] === selectedWordArray[index]) {
        answerState[index] = { letter: guessedWordArray[index], state: 'correct' };
        remainingLetters[index] = '';
      }
    }

    // Second pass: mark misplaced or wrong using only remaining unmatched letters
    for (let index = 0; index < guessedWordArray.length; index++) {
      if (answerState[index]) continue;
      const element = guessedWordArray[index];
      const remainingIndex = remainingLetters.indexOf(element);
      if (remainingIndex !== -1) {
        answerState[index] = { letter: element, state: 'missplaced' };
        remainingLetters[remainingIndex] = '';
      } else {
        answerState[index] = { letter: element, state: 'wrong' };
      }
    }

    this.guesses[this.guessNumber] = answerState;
    this.guessNumber++;
    this.guessesSubject.next(this.guesses);
    return answerState.every((s) => s.state === 'correct');
  }

  reset() {
    this.selectedWord = faker.helpers.arrayElement(WORDS_LIST);
    this.guessNumber = 0;
    this.guesses = Array.from({ length: 6 }, this.createEmptyGuess);
    this.guessesSubject.next(this.guesses);
  }

  createEmptyGuess() {
    const emptyGuess: Array<LetterState> = Array.from({ length: 5 }, () => {
      const guess: LetterState = {
        state: 'empty',
      };
      return guess;
    });

    return emptyGuess;
  }
}
