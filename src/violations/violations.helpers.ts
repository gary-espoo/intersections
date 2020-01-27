import { Injectable } from '@nestjs/common';
import {join} from 'path';
import { readFileSync } from "fs";
import { Violation } from './interface/violation.interface';

var contents = JSON.parse(readFileSync(join(process.cwd(), 'data', 'data.json'),'utf8'));

console.log(Object.keys(contents))

@Injectable()
export class ViolationsHelpers {
    ViolationsHelpers(){
        this.sortViolations(contents[3]);        
        
    }
    sortViolations(violations:Violation[]){
        
        const compare = (a :Violation,b:Violation):number=>{
            if (Date.parse(a.time) > Date.parse(b.time)) {
                return 1;
            }else{
                return -1;
            }
   
        }

        violations.sort(compare);
        console.log(violations.slice(0,10))
    }
}
