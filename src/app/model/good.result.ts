import { Result } from './result';
import { Good } from './good';
export class GoodResult extends Result {
    data: Good[];
    total: number;
}

