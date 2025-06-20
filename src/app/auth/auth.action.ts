import { Action } from "@ngrx/store"

export const AUTHENTICATED = '[AUTH] Authenticated'
export const UN_AUTHENTICATED = '[AUTH] Un Authenticated'

export class Authenticated implements Action {
    readonly type = AUTHENTICATED
}

export class UnAuthenticated implements Action {
    readonly type = UN_AUTHENTICATED
}