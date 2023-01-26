const fs = require("fs").promises;

async function listFiles() {
  try {
    const files = await fs.readdir(".");
    for (const file of files) {
      console.log(file);
    }
  } catch (error) {
    console.error(error);
  }
}


listFiles();