import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment.development';
import {GetUserProfileResponseInterface} from '../../../../containers/userProfile/types/getUserProfileResponse.interface';
import {ProfileInterface} from '../../../data/types/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowButtonService {
  constructor(private http: HttpClient) {}

  followUser(username: string | undefined): Observable<ProfileInterface> {
    const url = this.getUrl(username);    

    return this.http
      .post<GetUserProfileResponseInterface>(url, [])
      .pipe(map((response) => response.profile));
  }

  unFollowUser(username: string | undefined) {
    const url = this.getUrl(username);    

    return this.http
      .delete<GetUserProfileResponseInterface>(url)
      .pipe(map((response) => response.profile));
  }

  getUrl(username: string | undefined): string {
    return `${environment.apiUrl}/profiles/${username}/follow`;
  }
}
