import { useParams } from "react-router-dom";

export default function BookPage() {
  const { booksId } = useParams();
  return (
    <div>
      {" "}
      <p>Dette er en bokside side for bøker med id {booksId}</p>{" "}
    </div>
  );
}
