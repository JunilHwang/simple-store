let currentObserver = null;

const debounceFrame = (callback) => {
  let currentCallback = -1;
  return callback => {
    cancelAnimationFrame(currentCallback); // 현재 등록된 callback이 있을 경우 취소한다.
    currentCallback = requestAnimationFrame(callback); // 1프레임 뒤에 실행되도록 한다.
  }
};

export const observe = fn => {
  currentObserver = debounceFrame(fn);
  fn();
  currentObserver = null;
}

export const observable = obj => {
  Object.keys(obj).forEach(key => {
    let _value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get () {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },

      set (value) {
        if (_value === value) return;
        if (JSON.stringify(_value) === JSON.stringify(value)) return;
        _value = value;
        observers.forEach(fn => fn());
      }
    })
  })
  return obj;
}
