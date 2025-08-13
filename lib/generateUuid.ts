import { v7 as uuidv7 } from "uuid";

function generateUuid() {
  return uuidv7();
}

export { generateUuid };
