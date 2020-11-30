export interface IGeoLocationController {
    search(address: string): Promise<any>;
}