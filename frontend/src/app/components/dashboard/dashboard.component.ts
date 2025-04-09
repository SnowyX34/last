import { Component, OnInit } from '@angular/core';
import { Unit } from 'src/app/interfaces/unit';
import { UnidadesService } from 'src/app/services/units.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listUnits: Unit[] = []

  constructor(private _unitService: UnidadesService) { }

  ngOnInit(): void {
    this.getUnits();
  }

  getUnits() {
    this._unitService.getUnits().subscribe(data => {
      this.listUnits = data;
    })
  }

}
