import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { AdDetails } from '../models';
import { Injectable } from '@angular/core';
import { CompanyJobAdsService } from '../services';

@Injectable({ providedIn: 'root' })
export class JobAdDetailsResolver implements Resolve<AdDetails> {

  constructor(private jobAdsService: CompanyJobAdsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<AdDetails | RedirectCommand> {

    const adId: number = Number(route.paramMap.get('id'));

    return this.jobAdsService.get(adId);
  }
}
