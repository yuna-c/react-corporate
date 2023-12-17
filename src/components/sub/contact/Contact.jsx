import { useEffect, useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const { kakao } = window;
  const [Index, setIndex] = useState(0);
  const mapFrame = useRef(null);
  const marker = useRef(null);
  console.log(kakao);

  //지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
  const mapInfo = useRef([
    {
      title: "삼성역 코엑스",
      latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "넥슨 본사",
      latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
    {
      title: "서울 시청",
      latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.maps.Size(232, 99),
      imgPos: { offset: new kakao.maps.Point(116, 99) },
    },
  ]);

  //마커 인스턴스 생성
  marker.current = new kakao.maps.Marker({
    position: mapInfo.current[Index].latlng,
    image: new kakao.maps.MarkerImage(
      mapInfo.current[Index].imgSrc,
      mapInfo.current[Index].imgSize,
      mapInfo.current[Index].imgOpt
    ),
  });

  useEffect(() => {
    const mapInstance = new kakao.maps.Map(mapFrame.current, {
      center: mapInfo.current[Index].latlng,
      level: 3,
    });
    marker.current.setMap(mapInstance);
  }, [Index, kakao]);

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
        <nav className="btn-area">
          {mapInfo.current.map((el, idx) =>
            //prettier-ignore
            <button key={idx} onClick={() => setIndex(idx)} className={`btn ${idx === Index ? 'on' : ''}`}>{el.title}</button>
          )}
        </nav>

        <article className="mapBox" ref={mapFrame}></article>
      </section>
    </Layout>
  );
}
