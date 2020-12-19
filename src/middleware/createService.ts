export default function createService<T>(serviceFactory: () => T) {
  let instance: T;
  return function createInstance() {
    !instance && (instance = serviceFactory());
    return instance;
  };
}
