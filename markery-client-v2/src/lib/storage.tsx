class Storage {
  setItem(key: string, value: any) {
    const formatedValue = JSON.stringify(value);
    localStorage.setItem(key, formatedValue);
  }

  getItem(key: string) {
    const formatedValue = localStorage.getItem(key);
    if (formatedValue) {
      const parsedValue = JSON.parse(formatedValue || "");
      return parsedValue;
    }
    return false;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

const storage = new Storage();

export { storage };
