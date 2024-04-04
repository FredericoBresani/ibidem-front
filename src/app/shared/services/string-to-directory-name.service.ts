import { Injectable } from "@angular/core";

@Injectable({ 
    providedIn: 'root' 
})
export class StringToDirectoryNameService {
    public stringToDirName(value: string, ...args: any[]): string {
        const replaceRegex = / /g;
        const updatedValue = (value.replace(replaceRegex, '-').toLowerCase());
        return updatedValue;
    }
}