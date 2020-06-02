const express = require("express");
const bodyParser = require("body-parser");
const db = require("./sequelize");
const app = express();

const port = 8083;

// configure body parse
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/category", async (req, res) => {
  const { name } = req.body;
  console.log("name: ", req.body);
  try {
    if (!name || name.trim() === "") throw Error("name is invalid");
    const categoryEntity = await db.Category.create({
      name: name.trim().toLowerCase(),
    });
    res.json({
      success: true,
      data: categoryEntity.get({ plain: true }),
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/api/category", async (req, res) => {
  try {
    const result = await db.Category.findAll();
    setTimeout(() => {
      res.json({
        success: true,
        data: result.map((el) => el.get({ plain: true })),
      });
    }, 1000);
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
});
app.post("/api/item", async (req, res) => {
  const { name, categoryId, quantity } = req.body;
  console.log("name: ", req.body);
  try {
    if (!name || name.trim() === "") throw Error("name is invalid");
    if (!categoryId || categoryId.trim() === "")
      throw Error("categoryId is invalid");
    if (!quantity) throw Error("quantity is invalid");
    const itemEntity = await db.Item.create({
      name: name.trim().toLowerCase(),
      categoryId,
      quantity: parseInt(quantity),
    });
    res.json({
      success: true,
      data: itemEntity.get({ plain: true }),
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

app.get("/api/item", async (req, res) => {
  try {
    const result = await db.Item.findAll({
      include: [
        {
          model: db.Category,
          as: "category",
        },
      ],
    });

    // [ItemModel, ItemModel]

    // ItemModel.get({ plain: true }) -> {id, name}

    const data = result.map((itemModel) => {
      return itemModel.get({ plain: true });
    });

    // [{id, name}, {id, name}]

    const responseObj = {
      success: true,
      data,
    };

    res.json(responseObj);
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
