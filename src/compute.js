"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Compute;
(function (Compute) {
    /** The Heirarcy of operations:
     * Addition will call Sum addition if possible
     * Multiplication will call Product multiplication if possible
     */
    /**The most basic numerical parts of any Chunk of any sort*/
    class NumericalObject {
        constructor(v) {
            /** The numerical value associated with this object (default = 1)*/
            this.value = 1;
            this.value = v;
        }
        add(mo) {
            if (mo instanceof NumericalObject) {
                return new NumericalObject(this.value + mo.value);
            }
            else if (mo instanceof SumObject) {
                let moClone = mo.clone();
                moClone.addends.push(this.clone());
                return moClone;
            }
            return new SumObject([this.clone(), mo]);
        }
        multiply(mo) {
            if (mo instanceof NumericalObject) {
                return new NumericalObject(this.value * mo.value);
            }
            else if (mo instanceof ProductObject) {
                let po = mo.clone();
                po.factors.push(this.clone());
                return po;
            }
            return new ProductObject([this.clone(), mo]);
        }
        equals(mo) {
            if (mo instanceof NumericalObject) {
                return mo.value === this.value;
            }
            return false;
        }
        clone() {
            return new NumericalObject(this.value);
        }
        ;
    }
    Compute.NumericalObject = NumericalObject;
    /**The most basic represvariable parts of any Chunk of any sort*/
    class VariableObject {
        constructor(s, sub) {
            this.symbol = ((s !== undefined) && s.length === 1 && !s.includes("_")) ? s : "x";
            this.subscript = ((sub !== undefined) && !sub.includes("_")) ? sub : "";
        }
        add(mo) {
            if (mo instanceof SumObject) {
                let moClone = mo.clone();
                moClone.addends.push(this.clone());
                return moClone;
            }
            return new SumObject([this.clone(), mo]);
        }
        multiply(mo) {
            // if(mo instanceof VariableObject){
            //     return new VariableObject(this.value*mo.value);
            // }
            if (mo instanceof ProductObject) {
                let po = mo.clone();
                po.factors.push(this.clone());
                return po;
            }
            return new ProductObject([this.clone(), mo]);
        }
        equals(mo) {
            if (mo instanceof VariableObject) {
                return this.symbol === mo.symbol && this.subscript === mo.subscript;
            }
            return false;
        }
        clone() {
            return new VariableObject(this.symbol, this.subscript);
        }
        ;
        /** Produces the string representation the variable in the form "symbol_subscript" */
        toString() {
            return this.symbol + "_" + this.subscript;
        }
    }
    Compute.VariableObject = VariableObject;
    /** The mapping of all named variables to their MathObjects */
    class VariableMap extends Map {
    }
    Compute.VariableMap = VariableMap;
    class SumObject {
        constructor(adds) {
            this.addends = [];
            this.addends = adds;
        }
        add(mo) {
            if (mo instanceof SumObject) {
                let addends = this.addends.map((mo_) => mo_.clone());
                addends.push(...mo.addends.map((mo_) => mo_.clone()));
                return new SumObject(addends);
            }
            let clone = this.clone();
            clone.addends.push(mo.clone());
            return clone;
        }
        multiply(mo) {
            if (mo instanceof ProductObject) {
                let po = mo.clone();
                po.factors.push(this.clone());
                return po;
            }
            return new ProductObject([this.clone(), mo]);
        }
        distribute(mo) {
            let addends = this.addends.map((mo_) => mo_.clone().multiply(mo));
            return new ProductObject(addends);
        }
        equals(mo) {
            if (mo instanceof SumObject) {
                let indexesMatched = new Set();
                let match = true;
                for (let addend of this.addends) {
                    let index = mo.addends.findIndex((addend_, i) => (!indexesMatched.has(i) && addend_.equals(addend)));
                    if (index == -1) {
                        match = false;
                        break;
                    }
                }
                return match;
            }
            return false;
        }
        clone() {
            return new SumObject(this.addends.map((mo) => mo.clone()));
        }
        ;
    }
    Compute.SumObject = SumObject;
    class ProductObject {
        constructor(fs) {
            this.factors = [];
            this.factors = fs;
        }
        add(mo) {
            if (mo instanceof SumObject) {
                let moClone = mo.clone();
                moClone.addends.push(this.clone());
                return moClone;
            }
            return new SumObject([this.clone(), mo]);
        }
        multiply(mo) {
            if (mo instanceof ProductObject) {
                let factors = this.factors.map((mo_) => mo_.clone());
                factors.push(...mo.factors.map((mo_) => mo_.clone()));
                return new ProductObject(factors);
            }
            let clone = this.clone();
            clone.factors.push(mo.clone());
            return clone;
        }
        equals(mo) {
            if (mo instanceof ProductObject) {
                let indexesMatched = new Set();
                let match = true;
                for (let factor of this.factors) {
                    let index = mo.factors.findIndex((factor_, i) => (!indexesMatched.has(i) && factor_.equals(factor)));
                    if (index == -1) {
                        match = false;
                        break;
                    }
                }
                return match && indexesMatched.size == mo.factors.length;
            }
            return false;
        }
        clone() {
            return new ProductObject(this.factors.map((mo) => mo.clone()));
        }
        ;
    }
    Compute.ProductObject = ProductObject;
    function add(a, b) {
        return (new NumericalObject(a).add(new NumericalObject(b))).value;
    }
    Compute.add = add;
    function multiply(a, b) {
        return new NumericalObject(a).multiply(new NumericalObject(b)).value;
    }
    Compute.multiply = multiply;
    // /** Any stated relationship between two or more MathObjects*/
    // interface Relationship { }
    // /** Any stated relationship between two MathObjects*/
    // interface BinaryRelationship<L extends MathObject, R extends MathObject> extends Relationship { }
    // /** Any change to any given MathObject(s)*/
    // interface Operator {
    //     operate: Function;
    // }
    // /** Any change to two MathObject(s)*/
    // class BinaryOperator implements Operator {
    //     operate: (l: MathObject, r: MathObject) => MathObject;
    //     constructor(f: (l: MathObject, r: MathObject) => MathObject) {
    //         this.operate = f;
    //     }
    // }
})(Compute = exports.Compute || (exports.Compute = {}));
