import { createIntegralElement } from "./elmentGenerators/integral";

export const commands:Record<string, command> = {
    '/span': {
        getNode() {
            const newSpan = document.createElement('span');
            newSpan.className = 'something';
            newSpan.textContent = 'something';
            return newSpan;
        }
    },
    '^': {
        getNode() {
            const newSpan = document.createElement('sup');
            newSpan.textContent = '□';
            return newSpan;
        }
    },
    '$': {
        getNode() {
            const newSpan = document.createElement('span');
            return newSpan;
        }
    },
    '/int': {
        getNode:createIntegralElement
    }
};

interface command {
    getNode: () => HTMLElement
}