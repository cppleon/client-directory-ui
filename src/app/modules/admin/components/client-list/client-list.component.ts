import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Client } from 'src/app/shared/Client';
import * as $ from 'jquery';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  private _timeoutId: any;

  readonly gender = { M: 'კაცი', F: 'ქალი' };

  searchForm: FormGroup;

  counts = { active: 0, inactive: 0, total: 0 };
  clients = { items: [], totalCount: 0 };

  sortParams: any = {};
  queryParams: any = {};

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.searchForm = this._fb.group({ q: [''] });

    this.searchForm.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(({ q }) => {
        console.log(123)
        this._router.navigate(['/admin/client-list'], {
          queryParams: { q },
          queryParamsHandling: 'merge'
        });
      });
  }

  ngOnInit() {
    this._loadCounts();

    this._activatedRoute.queryParams.subscribe((queryParams: any) => {
      this.queryParams = { page: 1, perPage: 10, ...queryParams };

      if (!queryParams.status) {
        this._router.navigate(['/admin/client-list'], {
          queryParams: { status: 2 },
          queryParamsHandling: 'merge',
          skipLocationChange: true
        });
        return;
      }

      this.searchForm.patchValue(queryParams, { emitEvent: false });

      if (queryParams.sort && queryParams.sort.length) {
        queryParams.sort.split(',').forEach((param: string) => {
          const [field, direction] = param.split(':');
          this.sortParams[field] = direction || 'asc';
        });
      }

      this._loadClients();
    });
  }

  private _loadCounts() {
    this._http.get('/api/clients/counts').subscribe((res: any) => {
      this.counts = res.data;
    });
  }

  private _loadClients() {
    // const { q } = this.searchForm.value;
    const { q, status, page, perPage } = this.queryParams;

    const queryString = $.param({
      q, status,
      skip: (page - 1) * perPage,
      limit: perPage,
      sort: this.sortParams
    });

    this._http.get(`/api/clients?${queryString}`).subscribe((res: any) => {
      this.clients = res.data;
    });
  }

  sort(field: string) {
    clearTimeout(this._timeoutId);

    switch (this.sortParams[field]) {
      case 'asc':
        this.sortParams[field] = 'desc';
        break;

      case 'desc':
        delete this.sortParams[field];
        break;

      default:
        this.sortParams[field] = 'asc';
    }

    this._timeoutId = setTimeout(() => {
      const sort = Object.keys(this.sortParams)
        .map((key) => `${key}:${this.sortParams[key]}`)
        .join(',');

      this._router.navigate(['/admin/client-list'], {
        queryParams: { sort },
        queryParamsHandling: 'merge'
      });
    }, 500);
  }

  onPageChange(page: number) {
    this._router.navigate(['/admin/client-list'], {
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }

  removeClient(client: Client) {
    this._http.delete(`/api/clients/${client._id}`).subscribe(() => {
      this._loadCounts();
      this._loadClients();
    });
  }

}
