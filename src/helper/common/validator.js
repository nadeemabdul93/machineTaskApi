/** @format */

import { body } from "express-validator";


const validate = (method) => {
  switch (method) {

    case "taskForm": {
      return [
        body("title", "titleRequired").not().isEmpty(),
        body("description", "descriptionRequired").not().isEmpty(),
      ];
    }
  }
}

export default validate;

