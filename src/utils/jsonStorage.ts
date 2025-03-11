import fs from "fs";

type key = string | number;

export default class JsonStorage<Data> {
  #values: Record<key, Data> = {};

  constructor(private readonly fileName: string) {
    this.load();
  }

  load() {
    try {
      const data = fs.readFileSync(this.fileName, "utf-8");
      this.#values = JSON.parse(data) ?? {};
    } catch (error) {
      console.error("Failed to load data from file", error);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.fileName, JSON.stringify(this.#values));
    } catch (error) {
      console.error("Failed to save data to file", error);
    }
  }

  get(key: key): Data | undefined {
    return this.#values[key];
  }

  set(key: key, value: Data) {
    this.#values[key] = value;
    this.save();
  }

  getAll() {
    return this.#values;
  }
}
