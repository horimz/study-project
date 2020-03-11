class Storage {
  setItem(key: string, value: any) {
    const formatedValue = JSON.stringify(value);
    localStorage.setItem(key, formatedValue);
  }

  getItem(key: string) {
    const formatedValue = localStorage.getItem(key);
    const parsedValue = JSON.parse(formatedValue || "");
    return parsedValue;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

const storage = new Storage();

export { storage };
