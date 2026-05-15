import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import type { Book } from "../types";

interface BookListProps {
  books: Book[];
}

export const BookList = ({ books }: BookListProps) => (
  <div data-testid="book-list">
    <Grid container spacing={3}>
      {books.map(({ id, name, description }) => (
        <Grid
          size={{ xs: 4, sm: 6 }}
          key={id}
          className="book-item"
          data-testid="book-item"
        >
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <Link to={`/books/${id}`}>View Details</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);
