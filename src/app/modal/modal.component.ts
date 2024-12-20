import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DataService } from '../data.service';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-content">
      <h2 mat-dialog-title>{{ data.error ? 'Error' : details?.label || 'Loading...' }}</h2>
      <div mat-dialog-content>
        <div *ngIf="data.error">{{ data.error }}</div>
        <div *ngIf="!data.error && loading">Loading details...</div>
        <div *ngIf="!data.error && details && !loading">
          <p><strong>Name:</strong> {{ details.label }}</p>
          <p><strong>Description:</strong> {{ details.description }}</p>
          <p><strong>Ontology Link:</strong> <a [href]="details.iri" target="_blank">{{ details.obo_id }}</a></p>
          <p><strong>IRI:</strong> {{ details.iri }}</p>
        </div>
      </div>
      <div mat-dialog-actions align="end">
        <button mat-button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-content {
      padding: 20px;
    }
    .error {
      color: red;
      margin: 10px 0;
    }
  `],
  standalone: true,
  imports: [CommonModule, MatButtonModule]
})
export class ModalComponent {
  details: any;
  loading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id?: string; error?: string },
    private dialogRef: MatDialogRef<ModalComponent>,
    private dataService: DataService
  ) {
    if (data?.id) {
      this.loading = true;
      this.dataService.getStructureDetails(data.id).subscribe({
        next: (response) => {
          this.details = response;
          this.loading = false;
        },
        error: (err) => {
          console.error('Modal Error:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false; // No ID provided
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
