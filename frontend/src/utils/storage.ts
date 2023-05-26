function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItem<T>(key: string) {
  const storedState = localStorage.getItem(key);

  if (!storedState) {
    return null;
  }

  return JSON.parse(storedState) as T;
}

function removeItem(key: string) {
  localStorage.removeItem(key);
}

function clear() {
  localStorage.clear();
}

const storage = {
  setItem,
  getItem,
  removeItem,
  clear,
};

export default storage;
