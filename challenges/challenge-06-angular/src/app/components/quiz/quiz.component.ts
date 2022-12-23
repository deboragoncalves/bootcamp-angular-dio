import { Component, OnInit } from '@angular/core';

// Usar require e não import para importar JSON
let dataQuiz = require('../../../assets/data/dataQuiz.json');

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  titleHeader: string = "";

  questions: any; // array de objetos
  questionSelected: any; // questão/objeto selecionada, com as propriedades id, question..

  answers: string[] = [];
  answerSelected: string = ""; // resposta da questão atual

  questionIndex: number = 0;
  lengthQuestionsArray: number = 0;

  finished: boolean = false; // para controlar a exibição da resposta, com ngIf

  ngOnInit(): void {
    if (dataQuiz) {
      this.setInitialQuizValues();
    }
  }

  setInitialQuizValues = () => {
    this.titleHeader = dataQuiz.titleHeader;
    this.finished = false;

    this.questions = dataQuiz.questions;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];

    this.lengthQuestionsArray = this.questions.length;
  }

  chosePlayer = (choseAnswer: string) => {
    if (!choseAnswer) return;
    this.answers.push(choseAnswer);
    this.nextStep();
  }

  nextStep = async () => {
    this.questionIndex++;

    if (this.lengthQuestionsArray > this.questionIndex) {
      // Próxima pergunta
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      // Verificar resultado
      let finalAnswer: string = await this.checkResult(this.answers);
      console.log("Respostas: ");
      console.log(this.answers);
      console.log("Final: " + finalAnswer);
      // Forçar a variável a ser do mesmo tipo (string) de uma das chaves do objeto results (A, B)
      this.answerSelected = dataQuiz.results[finalAnswer as keyof typeof dataQuiz.results];
    }
  }

  async checkResult(answers: string[]) {
    let countElement: any = {};

    if (answers) {
      answers.forEach(answer => {
        // se elemento já existir, só incrementar
        if (countElement[answer]) {
          countElement[answer] += 1;
        } else {
          countElement[answer] = 1; 
        }
        
      })
    }

    let result:string = "";

    if (countElement["A"] > countElement["B"]) {
      result = "A";
    } else {
      result = "B";
    }

    return result;
  }

}
