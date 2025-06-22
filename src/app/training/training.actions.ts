import { Action } from "@ngrx/store";
import { Training } from "./training.modal";

export const FINISHED_EXCERSISES = "[Training] Finished Excersises";
export const AVAILABLE_EXCERSISES = "[Training] Available Excersises";
export const START_EXCERSISE = "[Training] START Excersise";
export const STOP_EXCERSISE = "[Training] STOP Excersise";

export class SetFinsihedExcersises implements Action {
    readonly type = FINISHED_EXCERSISES
    constructor(public payload: Training[]) {}
}
export class SetAvailableExcersises implements Action {
    readonly type = AVAILABLE_EXCERSISES
    constructor(public payload: Training[]) {}
}
export class SetStartExcersises implements Action {
    readonly type = START_EXCERSISE
    constructor(public payload: String) {}
}
export class SetStopExcersises implements Action {
    readonly type = STOP_EXCERSISE
}

export type TrainingAction = SetFinsihedExcersises | SetAvailableExcersises | SetStartExcersises | SetStopExcersises