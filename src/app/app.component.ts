import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { Funko } from './shared/model/funko.model';
import { UtilsService } from './shared/service/utils.service';

/**
 * TODO:
 * - Search
 * - Multiple Add
 * - Picture and other fields
 */
@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funkoList: Funko[];
  funkoListFiltered: Funko[];
  dragState = false;

  searchForm = new FormGroup({
    query: new FormControl(''),
    radioModel: new FormControl('all'),
    categorieModel: new FormControl('All'),
    collectionModel: new FormControl('All')
  });

  isQuery: boolean;

  constructor(private http: HttpClient, private dialog: MatDialog, private utils: UtilsService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    /*     this.http.get('assets/funko.json').subscribe((res: Funko[]) => {
      this.funkoList = res;
      this.funkoListFiltered = [...this.funkoList];
    }); */

    this.searchForm.valueChanges.subscribe(values => {
      this.isQuery = !!values.query;
      // this.pushState(values);

      setTimeout(() => {
        this.filtering();
      }, 0);
    });
  }

  // openUploadForm(): void {
  //   const dialogRef = this.dialog.open(AddModifyComponent, {
  //     data: { funko: {} }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.funkoList.push(result);
  //   });
  // }

  downloadJson() {
    this.utils.saveAs(JSON.stringify(this.funkoList));
  }

  visualize() {
    // visualisation of funko.json
  }

  addFunko(funko: Funko = {} as Funko) {
    const dialogRef = this.dialog.open(AddModifyComponent, { minWidth: '60vw', data: { funko } });

    dialogRef.afterClosed().subscribe((result: Funko) => {
      if (result) {
        result.guid = this.utils.getGuid();
        this.funkoList.unshift(result);
        this.clearInput();
      }
    });
  }

  delete(funko: Funko) {
    const index = this.funkoList.indexOf(funko);
    if (index > -1) {
      this.funkoList.splice(index, 1);
      this.clearInput();
    }
  }

  dropHandler(ev: DragEvent) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    const fileReader = new FileReader();
    fileReader.onload = e => {
      this.funkoList = JSON.parse(fileReader.result as string);
      this.funkoList.forEach((funko: Funko) => {
        funko.guid = this.utils.getGuid();
      });
      this.funkoListFiltered = [...this.funkoList];
    };

    fileReader.readAsText(ev.dataTransfer.items[0].getAsFile());

    this.dragState = false;
  }

  dragOverHandler(ev: Event) {
    // Prevent default behavior (Prevent file from being opened)
    ev.stopPropagation();
    ev.preventDefault();
  }

  clearInput() {
    this.searchForm.patchValue({ query: '' });
  }

  private filtering() {
    this.funkoListFiltered = this.funkoList
      .filter(f => {
        return this.searchForm.get('radioModel').value === 'all' ? true : f[this.searchForm.get('radioModel').value];
      })
      .filter(f => {
        return this.searchForm.get('categorieModel').value === 'All' ? true : f.category === this.searchForm.get('categorieModel').value;
      })
      .filter(f => {
        return this.searchForm.get('collectionModel').value === 'All' ? true : f.collection === this.searchForm.get('collectionModel').value;
      })
      .filter((funko: Funko) => {
        const val = this.searchForm.get('query').value.toLowerCase();
        return (
          funko.name.toLowerCase().includes(val) ||
          funko.category.toLowerCase().includes(val) ||
          funko.collection.toLowerCase().includes(val) ||
          funko.number.toLowerCase().includes(val) ||
          (funko.tags && funko.tags.length && funko.tags.includes(val)) ||
          (funko.rarities && funko.rarities.length && funko.rarities.includes(val)) ||
          (funko.exclusivities && funko.exclusivities.length && funko.exclusivities.includes(val))
        );
      });
  }
}
