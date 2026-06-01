import jsonServer from "json-server";
const { bodyParser } = jsonServer;

const server = jsonServer.create();
const router = jsonServer.router("stub-server/books.json");

const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  if (req.method === "DELETE" && req.query["_cleanup"]) {
    const db = router.db;
    db.set("books", []).write();
    res.sendStatus(204);
  } else {
    next();
  }
});

server.use(bodyParser[0]);
server.use(bodyParser[1]);

server.post("/books/:id/reviews", (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;

  const book = router.db
    .get("books")
    .find({ id: parseInt(id) })
    .value();
  if (!book) {
    res.sendStatus(404).json({ error: "Book not found" });
    return;
  }

  if (!book.reviews) {
    book.reviews = [];
  }

  const review = {
    id: book.reviews.length + 1,
    bookId: parseInt(id),
    name,
    content,
  };

  book.reviews.push(review);
  router.db.write();

  res.status(201).json(review);
});

server.delete("/books/:id/reviews", (req, res) => {
  const { id } = req.params;

  const book = router.db
    .get("books")
    .find({ id: parseInt(id) })
    .value();
  if (!book) {
    res.sendStatus(404).json({ error: "Book not found" });
    return;
  }

  book.reviews = [];
  router.db.write();

  res.sendStatus(204);
});

server.use(middlewares);
server.use(router);

server.listen(8079, () => {
  console.log("JSON server is running");
});
