import Carousel from "react-bootstrap/Carousel";

function ImageCarousel(props) {
  const { children } = props || {};

  return (
    <Carousel>
      {children.length > 0 &&
        children.map((child, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={child?.image ?? ""}
              alt="First slide"
              style={{ maxHeight: 700, objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>{child?.label ?? ""}</h3>
              <p>{child?.description ?? ""}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default ImageCarousel;
