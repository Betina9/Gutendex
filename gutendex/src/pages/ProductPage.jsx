import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { productId } = useParams();
  return (
    <div>
      {" "}
      <p>Dette er en produkt side for produkt med id {productId}</p>{" "}
    </div>
  );
}
