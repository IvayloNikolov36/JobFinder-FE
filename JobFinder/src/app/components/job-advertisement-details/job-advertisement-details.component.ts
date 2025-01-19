import { Component, OnInit } from '@angular/core';
import { JobDetails } from '../../models/job-details';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'jf-job-advertisement-details',
  templateUrl: './job-advertisement-details.component.html',
  standalone: false
})
export class JobAdvertisementDetailsComponent implements OnInit {

  jobDetails!: JobDetails;

  page!: number;
  items!: number;
  searchText!: string;
  location!: string | null;
  category!: number;
  engagement!: number;
  sortBy!: string | null;
  isAscending!: boolean;

  readonly initialPage: number = 1;
  readonly itemsPerPage: number = 10;
  readonly selectValueNone: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getJobDetails();
    this.geQueryParamsData();
  }

  private getJobDetails = (): void => {
    this.jobDetails = this.route.snapshot.data['singleJob']; // TODO: fix to get job details
  }

  private geQueryParamsData = (): void => {
    const queryParams: ParamMap = this.route.snapshot.queryParamMap;

    const pageValue: string | null = queryParams.get('page');
    this.page = pageValue === null ? this.initialPage : parseInt(pageValue);

    const itemsValue: string | null = queryParams.get('items');
    this.items = itemsValue === null ? this.itemsPerPage : parseInt(itemsValue);

    this.searchText = queryParams.get('searchText') ?? '';
    this.location = queryParams.get('location');

    const categoryValue: string | null = queryParams.get('category');
    this.category = categoryValue === null ? this.selectValueNone : parseInt(categoryValue);

    const engagementValue: string | null = queryParams.get('engagement');
    this.engagement = engagementValue === null ? this.selectValueNone : parseInt(engagementValue);

    this.sortBy = queryParams.get('sortBy');
    this.isAscending = queryParams.get('isAscending') === 'true' ? true : false;
  }
}
