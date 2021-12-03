/**
 * Merges two classes together
 * see: https://www.typescriptlang.org/docs/handbook/mixins.html
 * @param derivedCtor
 * @param constructors
 */
export default function applyMixins (derivedCtor: any, ...constructors: any[]) {
    constructors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype)
            .forEach(name => {
                Object.defineProperty(
                    derivedCtor.prototype,
                    name,
                    Object.getOwnPropertyDescriptor(baseCtor.prototype, name) || Object.create(null)
                );
            });
    });
}
