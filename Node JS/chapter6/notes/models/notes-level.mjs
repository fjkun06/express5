import util from "util";
import { Note, AbstractNotesStore } from "./Notes.mjs";
import { Level } from "level";
import { default as DBG } from "debug";

const debug = DBG("notes:notes-level");
const error = DBG("notes:error-level");

let db;

function connectDB() {
  if (typeof db === "undefined" || db) return db;
  db = new Level(process.env.LEVELDB_LOCATION || "notes.level", {
    // createIfMissing: true,
    valueEncoding: "json",
  });

  debug(db);
  console.log("====================================");
  console.log(db);
  console.log("====================================");
  return db;
}

export const xdb = new Level(process.env.LEVELDB_LOCATION || "notes.level", {
  createIfMissing: true,
  valueEncoding: "json",
});
export const xdb3 = new Level(process.env.LEVELDB_LOCATION || "notes.level", {
  createIfMissing: true,
  valueEncoding: "json",
});


const iterator = xdb3.iterator();

export default class LevelNotesStore extends AbstractNotesStore {
  async close() {
    const _db = db;
    db = undefined;
    return _db ? _db.close() : undefined;
  }

  async update(key, title, body) {
    return crupdate(key, title, body);
  }
  async create(key, title, body) {
    return crupdate(key, title, body);
  }
  async read(key) {
    const db = xdb3;
    // const db = await connectDB();
    const note = Note.fromJSON(await db.get(key));
    return note;
  }
  async destroy(key) {
    const db = xdb3;
    // const db = await connectDB();
    await db.del(key);
  }
  async keylist() {
    const db = xdb3;
    // const db = await connectDB();
    const keys = await db.keys({lt:"w", limit: 10 }).all();
    // await new Promise((resolve, reject) => {
    //   db.createKeyStream()
    //     .on("data", (data) => keyz.push(data))
    //     .on("error", (err) => reject(err))
    //     .on("end", () => resolve(keyz));
    // });
    return keys;
  }
  async count() {
    return iterator.count;
  }
}

async function crupdate(key, title, body) {
  const db = xdb3;
  // const db = await connectDB();
  const note = new Note(key, title, body);
  await db.put(key, note.JSON);
  return note;
}
