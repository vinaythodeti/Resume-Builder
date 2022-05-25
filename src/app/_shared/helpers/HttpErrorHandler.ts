import { ErrorHandler, Injectable } from '@angular/core';




@Injectable({
    providedIn:'root'
})
export class HttpErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        console.error('error:', error)
    }

}