// const util = require('util');
import { default as express } from "express";
import { NotesStore as notes } from "../models/notes-store.mjs";

export const router = express.Router();

//Add Note
router.get("/add", (req, res, next) => {
  // res.send("hello world note!");
  res.render("noteedit", { title: "Add a Note", docreate: true, notekey: "", note: undefined });
});

//Save Note
router.post("/save", async (req, res, next) => {
  // res.send("hello save note!");

  try {
    let note;
    if (req.body.docreate === "create") {
      await notes.create(req.body.notekey, req.body.title, req.body.body);
      // note = await notes.create(req.body.notekey, req.body.title, req.body.body);
    } else {
      await notes.update(req.body.notekey, req.body.title, req.body.body);
      // note = await notes.update(req.body.notekey, req.body.title, req.body.body);
    }
    // res.redirect("http://localhost:3000");
    res.redirect("/notes/view?key=" + req.body.notekey);
  } catch (err) {
    next(err);
  }
});

//Read Note
router.get("/view", async (req, res, next) => {
  try {
    let note = await notes.read(req.query.key);
    res.render("noteview", {
      title: note ? note.title : "",
      notekey: req.query.key,
      note: note,
    });
  } catch (err) {
    next(err);
  }
});

//Edit note (update)
router.get("/edit", async (req, res, next) => {
  try {
    const note = await notes.read(req.query.key);
    res.render("noteedit", {
      title: note ? "Edit " + note.title : "Add a Note",
      docreate: false,
      notekey: req.query.key,
      note: note,
    });
  } catch (error) {
    next(error);
  }
});
//Send note (data)
router.get("/data", async (req, res, next) => {
  try {
    const keylist = await notes.keylist();
    // console.log(`keylist ${util.inspect(keylist)}`);
    const keyPromises = keylist.map((key) => {
      return notes.read(key);
    });
    const notelist = await Promise.all(keyPromises)
    // console.log(util.inspect(notelist));

    res.json({ title: "Notes", notelist: notelist });
    // res.sendStatus(200).end()
  } catch (err) {
    next(err);
  }
});

//Delete note (destroy)
router.get("/destroy", async (req, res, next) => {
  try {
    // await notes.destroy(req.query.key);
    // res.redirect("http://localhost:3000");
    // res.end();

    const note = await notes.read(req.query.key);
    res.render("notedestroy", {
      title: note ? `Delete ${note.title}` : "",
      notekey: req.query.key,
      note: note,
    });
  } catch (error) {
    next(error);
  }
});

//Really destroy note
router.post("/destroy/confirm", async (req, res, next) => {
  try {
    const key = req.body.notekey.slice(3 - req.body.notekey.length);
    await notes.destroy(key);
    res.redirect("/");
    // res.send(req.body);
  } catch (error) {
    next(error);
  }
});
