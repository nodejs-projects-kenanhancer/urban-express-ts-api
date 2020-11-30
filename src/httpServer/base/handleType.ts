export type CallbackFunction = () => void;
export type SimpleHandleFunction = (req: any, res: any) => void;
export type NextHandleFunction = (req: any, res: any, next: any) => void;
export type ErrorHandleFunction = (err: any, req: any, res: any, next: any) => void;
export type HandleFunction = SimpleHandleFunction | NextHandleFunction | ErrorHandleFunction;