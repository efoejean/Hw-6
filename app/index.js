import data from "./data.js";
import { promises as fs } from "fs";
import express from "express";

const highestMileageVehicle = data
  .map(({ vehicles }) => vehicles.sort((a, b) => b.mileage - a.mileage)[0])
  .sort((a, b) => b.mileage - a.mileage)[0];

fs.writeFile(
  "highestMileageVehicle.Json",
  JSON.stringify(highestMileageVehicle)
);

const totalMileage = data.reduce((total, currentPerson) => {
  total += currentPerson.vehicles.reduce((personTotal, currentVehicle) => {
    personTotal += currentVehicle.mileage;
    return personTotal;
  }, 0);

  return total;
}, 0);

fs.writeFile("totalMileage.Json", String(totalMileage));

const yahooEmails = data
  .filter(({ email }) => email.endsWith("yahoo.com"))
  .map(({ email }) => email);

fs.writeFile("yahooEmails.Json", String(yahooEmails));

const hiMileageVehicles = data
  .map(({ vehicles }) => vehicles.filter(({ mileage }) => mileage >= 36000))
  .flat();

fs.writeFile("hiMileageVehicles.Json", JSON.stringify(hiMileageVehicles));

const totalMileage4IL = data
  .map(({ vehicles }) => vehicles.filter(({ st }) => st === "Illinois"))
  .flat()
  .reduce((total, currentVehicle) => {
    total += currentVehicle.mileage;
    return total;
  }, 0);

fs.writeFile("totalMileage4IL.Json", String(totalMileage4IL));

const app = express();

(async () => {
  app.get("/:page", async (req, res) => {
    const result = await fs.readFile(`${req.params.page}.Json`, "utf-8");
    res.json(result);
  });
})();

app.listen(3000, () => {
  console.log("Server is running");
});
