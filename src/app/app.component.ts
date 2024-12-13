import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DataFetchService } from './data-fetch.service';
import { ModalComponent } from './modal/modal.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
    this.dataFetchService.fetchData().subscribe(data => {
      const structures = data?.flatMap(row => row.anatomical_structures || []);
      const uniqueStructures = new Map<string, { name: string; id: string }>();

      structures.forEach(structure => {
        if (structure.name && structure.id) {
          uniqueStructures.set(structure.name, { name: structure.name, id: structure.id });
        }
      });

      this.uniqueAnatomicalStructures = Array.from(uniqueStructures.values());
    });
  }

  openDetails(structure: { name: string; id: string }): void {
    if (!structure.id.startsWith('UBERON:')) {
      console.error('Invalid ID format');
      return;
    }

    this.dialog.open(ModalComponent, {
      width: '500px',
      data: structure
    });
  }
}
