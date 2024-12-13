import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DataFetchService } from './data-fetch.service';
import { ModalComponent } from './modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

interface Structure {
  name?: string;
  id?: string;
}

interface ApiResponse {
  anatomical_structures: Structure[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule]
})
export class AppComponent implements OnInit {
  title = 'My Angular App';
  uniqueAnatomicalStructures: { name: string; id: string }[] = [];

  constructor(
    private dataFetchService: DataFetchService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataFetchService.fetchData().subscribe((data: ApiResponse[]) => {
      const structures: Structure[] = data?.flatMap(row => row.anatomical_structures || []);
      const uniqueStructures = new Map<string, { name: string; id: string }>();

      structures.forEach((structure: Structure) => {
        if (structure.name) {
          uniqueStructures.set(structure.name, {
            name: structure.name,
            id: structure.id || 'No ID'
          });
        }
      });

      this.uniqueAnatomicalStructures = Array.from(uniqueStructures.values());
    });
  }

  openDetails(structure: { name: string; id: string }): void {
    if (!structure.id || structure.id === 'No ID') {
      this.dialog.open(ModalComponent, {
        width: '500px',
        data: { error: `Structure "${structure.name}" has no ID.` }
      });
    } else {
      this.dialog.open(ModalComponent, {
        width: '500px',
        data: structure
      });
    }
  }
}
