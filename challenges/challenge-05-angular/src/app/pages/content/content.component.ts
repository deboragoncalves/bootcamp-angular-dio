import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockData } from 'src/app/data/mockData';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css', './content.responsive.component.css']
})
export class ContentComponent implements OnInit {
  contentPhoto: string = "";
  contentTitle: string = "";
  contentDescription: string = "";

  private contentId: string | null = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(value => this.contentId = value.get("id"));
    this.setValuesToComponent(this.contentId);
  }

  setValuesToComponent(id: string | null): void {
    const dataContent = mockData.filter(content => content.id == id)[0];

    if (dataContent) {
      this.contentId = dataContent.id;
      this.contentPhoto = dataContent.photo;
      this.contentTitle = dataContent.title;
      this.contentDescription = dataContent.description;
    }
  }
}
