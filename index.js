import app from "./app.js";
import { config } from "./server/config/config.js";
import { myConnection } from "./server/config/conn.js";

myConnection();

//inicialisacion no solo para saber en que puerto corre OJO
app.listen(config.PORT, () => {
  console.log(`Server on http://localhost:${config.PORT}`);
});
