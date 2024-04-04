import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParamsOptions } from "@angular/common/http";
import * as APP_CON from '../constants/constants';
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root',
})
export class RequestService {
    public APP_URL = APP_CON.APP_URL;

    constructor(private readonly httpClient: HttpClient) {}

    public get<T, K>(url?: string, params?: K, headers?: any): Observable<T> {
        return this.httpClient.get<T>(`${this.APP_URL}/${url}`, {
          headers: new HttpHeaders(
            {
              ...headers,
              ...{
                  Iuser: environment.header_user,
                 Itoken: environment.header_token
              }
            }
          ),
          params: new HttpParams({fromObject: params} as HttpParamsOptions),
        });
    }

    public getById<T, K>(url?: string, headers?: any, params?: K): Observable<T> {
        return this.httpClient.get<T>(`${this.APP_URL}/${url}`, {
            headers: new HttpHeaders(
                {
                  ...headers,
                  ...{
                    Iuser: environment.header_user,
                    Itoken: environment.header_token
                  }
                }
            ),
            params: new HttpParams({fromObject: params} as HttpParamsOptions)
        });
    }

    public post<T, K>(url?: string, body?: T, headers?: any): Observable<K> {
        return this.httpClient.post<K>(`${this.APP_URL}/${url}`, body, {
           headers: new HttpHeaders(
             {
              ...headers,
              ...{
                Iuser: environment.header_user,
                Itoken: environment.header_token
              }
             }
            ),
        });
    }

    public put<T, K>(url?: string, body?: T, headers?: any, params?: any): Observable<K> {
        return this.httpClient.put<K>(`${this.APP_URL}/${url}`, body, {
            params: new HttpParams({fromObject: params} as HttpParamsOptions),
            headers: new HttpHeaders(
              {
                ...headers,
                ...{
                  Iuser: environment.header_user,
                  Itoken: environment.header_token
                }
              }
              ),

        });
    }

    public delete<T, K>(url?: string, body?: T, headers?: any, params?: any): Observable<K> {
      return this.httpClient.delete<K>(`${this.APP_URL}/${url}`, {
          params: new HttpParams({fromObject: {...body, ...params}} as HttpParamsOptions),
          headers: new HttpHeaders(
            {
              ...headers,
              ...{
                Iuser: environment.header_user,
                Itoken: environment.header_token,
              }
            }
          )
      })
    }

    public articleSearch<T>(url: string, stringToSearch: string): Observable<T> {
      return this.httpClient.get<T>(`${this.APP_URL}/${url}/${stringToSearch}`, {
          headers: new HttpHeaders({
            Iuser: environment.header_user,
            Itoken: environment.header_token
          }),
      })
  }
}
