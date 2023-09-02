import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'haus-detailed-item-view',
  templateUrl: './detailed-item-view.component.html',
  styleUrls: ['./detailed-item-view.component.scss']
})
export class DetailedItemViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
