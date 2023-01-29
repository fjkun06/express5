import { AbstractNotesStore, Note } from "./Notes.mjs";

const notes = [];

export class InMemoryNotesstore extends AbstractNotesStore {
  async close() {}

  async update(key, title, body) {
    notes[key] = new Note(key, title, body);
    console.log(notes);

    return notes[key];
  }
  async create(key, title, body) {
    notes[key] = new Note(key, title, body);
    console.log(notes);
    return notes[key];

  }
  async read(key) {
    console.log(notes);

    if (notes[key]) return notes[key];
    else throw new Error(`Note ${key} doesn't exist`);
  }

  async delete(key) {
    console.log(notes);

    if (notes[key]) delete notes[key];
    else throw new Error(`Note ${key} doesn't exist`);
  }

  async keylist() {
    console.log(notes);

    return Object.keys(notes);
  }

  async count() {
    return notes.length;
  }
}
