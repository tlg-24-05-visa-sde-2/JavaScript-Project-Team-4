import React from "react";
import Navbar from "../components/Nabar";
import "../assets/css/navbar.css";
import "../assets/css/home.css";
import Footer from "../components/Footer";

interface AboutProps {
  props: any;
}

const About: React.FC<AboutProps> = ({props}) => {
  return (
    <div className="about">
      <Navbar props={props} />
      <div className="about-picture"></div>
      <div className="about-body-container">
        <div className="about-body-content">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            pharetra mattis nibh at blandit. Vestibulum tellus justo, laoreet
            quis dolor ac, ornare interdum felis. Nam sagittis metus ac massa
            mollis mollis. Nulla facilisi. Ut maximus faucibus nisi, interdum
            finibus lacus blandit et. Curabitur vel eros accumsan, accumsan
            neque in, mollis justo. In at nunc nisi. Donec aliquam molestie
            purus. Vestibulum dictum et turpis quis bibendum. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae; Nullam tempus non lorem sit amet tincidunt. Nam et odio ut
            nunc efficitur commodo id ac arcu. Mauris et egestas augue, non
            vulputate mi. Vestibulum tristique orci eu ipsum eleifend mollis.
            Praesent commodo tortor arcu, et posuere lectus lacinia a. Duis at
            turpis lobortis dolor ornare ornare. Quisque euismod ex vel velit
            consequat, non suscipit mi elementum. Sed viverra nisi magna, sed
            suscipit velit scelerisque non. Quisque in lacus ut quam
            pellentesque dictum bibendum et nisi. Sed finibus dui eu odio
            vestibulum, ut euismod magna venenatis. Praesent sagittis blandit
            magna in congue. Sed sit amet dapibus massa, eu mattis odio. Quisque
            eu consectetur libero. Donec fringilla facilisis felis, eu venenatis
            lectus. Curabitur suscipit ipsum elit, in eleifend velit porttitor
            in. Maecenas ornare velit maximus eros maximus porta ut vel nisi.
            Sed facilisis tincidunt diam sit amet tempus. Phasellus sit amet
            imperdiet quam, sed imperdiet arcu. Donec tempus efficitur massa vel
            auctor. Integer mollis eget diam non tempor. Mauris ultricies purus
            et quam porta, quis facilisis sem ullamcorper. Duis ut odio non odio
            ultricies auctor interdum quis lectus. Phasellus posuere pretium
            neque, in interdum lectus. Mauris quis ligula eu elit ullamcorper
            tempus. Etiam egestas maximus justo non iaculis. Nulla vitae aliquam
            odio, sit amet volutpat massa. Pellentesque mollis eget nisl quis
            malesuada. Vivamus lobortis, leo vel pellentesque gravida, nibh
            lorem euismod ex, eget fermentum est risus id mi. Praesent sit amet
            aliquam augue. Duis id nisl elit. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Aenean cursus
            eros et blandit fringilla.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
