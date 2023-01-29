import { AbstractNotesStore, Note } from "./Notes.mjs";

const notes = [];
notes["schneider"] = new Note("schneider", "Schneider", "She a real vixen and she is in Mamfe rn.");
notes["nance"] = new Note("nance", "Nance", "She a real troublemaker and she is in a hospital rn.");

export class InMemoryNotesstore extends AbstractNotesStore {
  async close() {}

  async update(key, title, body) {
    notes[key] = new Note(key, title, body);
    // console.log(notes);

    return notes[key];
  }
  async create(key, title, body) {
    notes[key] = new Note(key, title, body);
    // console.log(notes);
    return notes[key];
  }
  async copy() {
    return notes;
    // return notes['nance'];
  }
  async read(key) {
    // console.log(notes);

    if (notes[key]) return notes[key];
    else throw new Error(`Note ${key} doesn't exist`);
  }

  async destroy(key) {
    console.log("notes: ", notes);

    if (notes[key]) delete notes[key];
    else throw new Error(`Note ${key} doesn't exist`);
  }

  async keylist() {
    // console.log(notes);

    return Object.keys(notes);
  }

  async count() {
    return notes.length;
  }
}
