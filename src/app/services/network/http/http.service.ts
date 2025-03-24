import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../snack-bar/snack-bar.service';
import {ApiResponse} from '../../../models/network/ApiResponse';
import {endPoint, STATUS_SUCCESS} from '../../../constants/api-constants';
import {catchError, map, tap, throwError} from 'rxjs';
import {HttpPost} from '../../../models/network/HttpPost';
import {getToken} from '../../../utils/local-storage-utils';
import {Router} from '@angular/router';
import {RouteConstants} from '../../../constants/route-constants';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  serverUrl =endPoint;

  constructor(
    private http: HttpClient,
    private sbService: SnackBarService,
    private router : Router
  ) { }

  private onHttpSuccess(res: ApiResponse, showSnackBar: boolean, showSnackBarOnError: boolean) {
    if (showSnackBar && res.showSuccesSnackBar) {
      this.sbService.openSnack(res.description)
    }

    if (showSnackBarOnError && res.showErrorSnackbar) {
      this.sbService.openSnack(res.description)
    }
  }

  httpGet(queryUrl: string, withToken: boolean = false, params: any = null, showSnackBar = false, showSnackBarOnError = true) {
    const url = `${this.serverUrl}${queryUrl}`;
    return this.http.get(
      url,
      {
        params: params,
        headers : withToken?{
          Authorization: `Bearer ${getToken()}`
        }:{}
      }
    ).pipe(
      map((res: any) => new ApiResponse(res)),
      tap((res: ApiResponse) => {
        this.onHttpSuccess(res, showSnackBar, showSnackBarOnError)
        return res
      }),
      catchError(this.handleError)
    )
  }

  httpPostDirect({
                   queryUrl,
                   body = null,
                   showSnackBar = false,
                   showSnackBarOnError = true,
                   withToken = false
                 }:HttpPost){
    const url = `${this.serverUrl}${queryUrl}`;
    return this.http.post(
      url,
      body,
      {
        headers : withToken?{
          Authorization: `Bearer ${getToken()}`
        }:{}
      }
    ).pipe(
      map((res:any)=>JSON.parse(JSON.stringify(res))),
      map((res:any)=>new ApiResponse({data:res,status:STATUS_SUCCESS,description:'Success'})),
      tap((res:ApiResponse)=>{
        this.onHttpSuccess(res,showSnackBar,showSnackBarOnError)
        return res
      }),
      catchError(this.handleError)
    );
  }

  httpPost({ queryUrl, params = null, body = null, showSnackBar = false, showSnackBarOnError = true,withToken=false }: HttpPost) {
    const url = `${this.serverUrl}${queryUrl}`;
    return this.http.post(
      url,
      body,
      {
        params: params,
        headers : withToken?{
          Authorization: `Bearer ${getToken()}`
        }:{}
      }
    ).pipe(
      map((res: any) => new ApiResponse(res)),
      tap((res: ApiResponse) => {
        this.onHttpSuccess(res, showSnackBar, showSnackBarOnError)
        return res
      }),
      catchError(this.handleError)
    )
  }


  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = ''

    if (error.error.code === "token_not_valid" || error.error.code === "user_not_found") {
      this.sbService.openSnack('Session Expired')
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate([RouteConstants.LOGIN],{replaceUrl:true});
      this.sbService.openSnack('Session Expired')
      return throwError(() => new Error('Session Expired'));
    }
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = "Network Error"
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.

      //Access custom error from which is sent from backend



      if (!errorMessage) {
        errorMessage = `Something went wrong ${error.status ? `Error code : ${error.status}` : ''}`
      }

    }

    if (!errorMessage) {
      errorMessage = 'Something went wrong; Please try again later.'
    }

    this.sbService.openSnack(error.error.description===undefined?error.error.detail:error.error.description)

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errorMessage));
  }
}
