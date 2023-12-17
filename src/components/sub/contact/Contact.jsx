import { useEffect, useRef } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const mapFrame = useRef(null);
  const { kakao } = window;
  console.log(kakao);

  const mapOption = useRef({
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  });

  useEffect(() => {
    const mapInstance = new kakao.maps.Map(mapFrame.current, mapOption.current);
    const posInstance = new kakao.maps.LatLng(33.450701, 126.570667);
    const markerInstance = new kakao.maps.Marker({
      position: posInstance,
    });

    markerInstance.setMap(mapInstance);
  }, []);

  return (
    <Layout title={"Contact"}>
      <section className="visualBox">
        <div className="txt-area">
          <h3>Find us through the map</h3>
          <p>
            Get in touch with us!
            <br /> Complete the form below to discuss your project. We can't
            wait to collaborate and bring your vision to life. Get in touch with
            us!
          </p>
        </div>
      </section>

      <div className="line-holizontal"></div>

      <section className="contentBox">
        <article className="mapBox" ref={mapFrame}></article>
      </section>
    </Layout>
  );
}
