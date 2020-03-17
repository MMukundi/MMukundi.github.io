"use strict";
// import { Compute as cp} from './compute';
// import { Comprehend as ch } from './comprehend';
Object.defineProperty(exports, "__esModule", { value: true });
var Rationale;
(function (Rationale) {
    Rationale.version = "0.01";
    // export const Comprehend = ch;
    // export const Compute = cp;
    let Comprehend;
    (function (Comprehend) {
        function isTrue(b) {
            return b;
        }
        Comprehend.isTrue = isTrue;
    })(Comprehend = Rationale.Comprehend || (Rationale.Comprehend = {}));
})(Rationale = exports.Rationale || (exports.Rationale = {}));
console.log("Rationale built");
//tsc --outFile built/rationale.js src/compute.ts src/comprehend.ts src/rationale.ts
//tsc --outFile built/main.js src/main.ts
