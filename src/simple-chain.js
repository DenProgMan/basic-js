import { NotImplementedError } from '../extensions/index.js';

/**
 * Implement chainMaker object according to task description
 *
 */
export default {
    chain: [],
    getLength() {
        return this.chain.length;
    },
    addLink(value) {
        this.chain.push(`( ${value} )`);
        return this;
    },
    removeLink(position) {
        try {
            if (this.chain[position - 1]) {
                this.chain.splice(position - 1, 1);
                return this;
            } else {
                throw new Error('');
            }
        } catch (error) {
            this.chain = [];
            throw new Error("You can't remove incorrect link!");
        }
    },
    reverseChain() {
        this.chain.reverse();
        return this;
    },
    finishChain() {
        const result = this.chain.join('~~');
        this.chain = [];
        return result;
    }
};
