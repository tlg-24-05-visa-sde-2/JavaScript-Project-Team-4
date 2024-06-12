import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = (): React.ReactElement => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="https://images-platform.99static.com//7ugRrqUofT1FU4TCYeaRu_8Mi7g=/0x0:2000x2000/fit-in/500x500/99designs-contests-attachments/126/126433/attachment_126433145"
          alt="featured1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://images-platform.99static.com//qBB9nVvLpJrziQu3cIX8ulJcmfs=/452x0:1208x756/fit-in/500x500/99designs-contests-attachments/87/87722/attachment_87722733"
          alt="featured1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://images-platform.99static.com//Wx-b9RmVkjX0TanjriCeNpQihAc=/88x130:1677x1719/fit-in/500x500/projects-files/47/4791/479119/8a039801-8eb8-4613-8c1b-b875a8e02b34.png"
          alt="featured1"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
