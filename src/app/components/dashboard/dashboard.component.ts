import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThreeService } from '../../services/three/three.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // WebGL will be rendered on canvas
  @ViewChild('canvas', { static: true }) public canvas?: ElementRef<HTMLCanvasElement>;
  constructor(private threeService: ThreeService) { }

  ngOnInit(): void {
    this.threeService.createScene(this.canvas);
    this.threeService.animateScene();
  }

}
