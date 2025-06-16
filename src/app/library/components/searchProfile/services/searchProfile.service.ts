import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {map, Observable} from 'rxjs'
import { environment } from '../../../../../environments/environment.development'
import { SearchProfileInterface } from '../types/searchProfile.interface'
import { GetSearchResponseInterface } from '../types/getSearchResponse.interface'


@Injectable()
export class SearchProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(search: string): Observable<SearchProfileInterface[]> {
    const url = `${environment.apiUrl}/find-profile?search=${search}`;

    return this.http
      .get<GetSearchResponseInterface>(url)
      .pipe(map((response) => response.profile))
  }
}
