import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  env = environment;
  titleBigCard: string = this.env.bigCard.titleBigCard;
  imageUrlBigCard: string = this.env.bigCard.imageUrlBigCard;
  firstTitleSmallCard: string = this.env.smallCard.firstTitleSmallCard;
  firstImageSmallCard: string = this.env.smallCard.firstImageSmallCard;
  secondTitleSmallCard: string = this.env.smallCard.secondTitleSmallCard;
  secondImageSmallCard: string = this.env.smallCard.secondImageSmallCard;
  thirdTitleSmallCard: string = this.env.smallCard.thirdTitleSmallCard;
  thirdImageSmallCard: string = this.env.smallCard.thirdImageSmallCard;
}
