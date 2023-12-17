import { useEffect, useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Contact.scss";

export default function Contact() {
  const kakao = useRef(window.kakao);

  const [Index, setIndex] = useState(0);
  const [Traffic, setTraffic] = useState(false);
  const [View, setView] = useState(false);

  const mapFrame = useRef(null);
  const viewFrame = useRef(null);
  const marker = useRef(null);
  const mapInstance = useRef(null);

  console.log(kakao);

  //지점마다 출력할 정보를 개별적인 객체로 묶어서 배열로 그룹화
  const mapInfo = useRef([
    {
      title: "삼성역 코엑스",
      latlng: new kakao.current.maps.LatLng(
        37.51100661425726,
        127.06162026853143
      ),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
      imgSize: new kakao.current.maps.Size(232, 99),
      imgPos: { offset: new kakao.current.maps.Point(116, 99) },
    },
    {
      title: "넥슨 본사",
      latlng: new kakao.current.maps.LatLng(
        37.40211707077346,
        127.10344953763003
      ),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
      imgSize: new kakao.current.maps.Size(232, 99),
      imgPos: { offset: new kakao.current.maps.Point(116, 99) },
    },
    {
      title: "서울 시청",
      latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
      imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
      imgSize: new kakao.current.maps.Size(232, 99),
      imgPos: { offset: new kakao.current.maps.Point(116, 99) },
    },
  ]);

  const roadview = () => {
    new kakao.current.maps.RoadviewClient().getNearestPanoId(
      mapInfo.current[Index].latlng,
      50,
      (panoId) => {
        new kakao.current.maps.Roadview(viewFrame.current).setPanoId(
          panoId,
          mapInfo.current[Index].latlng
        );
      }
    );
  };

  const setCenter = () => {
    mapInstance.current.setCenter(mapInfo.current[Index].latlng);
    roadview();
  };

  //마커 인스턴스 생성
  marker.current = new kakao.current.maps.Marker({
    position: mapInfo.current[Index].latlng,
    image: new kakao.current.maps.MarkerImage(
      mapInfo.current[Index].imgSrc,
      mapInfo.current[Index].imgSize,
      mapInfo.current[Index].imgOpt
    ),
  });

  useEffect(() => {
    mapFrame.current.innerHTML = "";
    mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
      center: mapInfo.current[Index].latlng,
      level: 3,
    });

    marker.current.setMap(mapInstance.current);
    setTraffic(false);

    // 뷰박스 추가
    // new kakao.current.maps.RoadviewClient().getNearestPanoId(
    //   mapInfo.current[Index].latlng,
    //   50,
    //   (panoId) => {
    //     new kakao.current.maps.Roadview(viewFrame.current).setPanoId(
    //       panoId,
    //       mapInfo.current[Index].latlng
    //     );
    //   }
    // );
    roadview();
    setView(false);

    //지도 타입 컨트롤러 추가
    mapInstance.current.addControl(
      new kakao.current.maps.MapTypeControl(),
      kakao.current.maps.ControlPosition.TOPRIGHT
    );

    //지도 줌 컨트롤러 추가
    mapInstance.current.addControl(
      new kakao.current.maps.ZoomControl(),
      kakao.current.maps.ControlPosition.RIGHT
    );

    //휠에 맵 줌 기능 비활성화
    mapInstance.current.setZoomable(false);

    window.addEventListener("resize", setCenter);
    return () => window.removeEventListener("resize", setCenter);
  }, [Index]);

  useEffect(() => {
    Traffic
      ? mapInstance.current.addOverlayMapTypeId(
          kakao.current.maps.MapTypeId.TRAFFIC
        )
      : mapInstance.current.removeOverlayMapTypeId(
          kakao.current.maps.MapTypeId.TRAFFIC
        );
  }, [Traffic]);

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
            <button key={idx} onClick={() => {setIndex(idx); idx !== Index && setIndex(idx);}
              } className={`btn ${idx === Index ? 'on' : ''} `}>{el.title}</button>
          )}

          <button
            onClick={() => {
              setTraffic(!Traffic);
            }}
            className={`btn`}
          >
            {Traffic ? "Traffic OFF" : "Traffic ON"}
          </button>

          <button onClick={() => setView(!View)} className={`btn`}>
            {View ? "map view" : "road view"}
          </button>

          <button onClick={setCenter} className={`btn`}>
            위치 초기화
          </button>
        </nav>

        <section className="tab-area">
          <article
            className={`mapBox ${View ? "" : "on"}`}
            ref={mapFrame}
          ></article>
          <article
            className={`viewBox ${View ? "on" : ""}`}
            ref={viewFrame}
          ></article>
        </section>
      </section>
    </Layout>
  );
}
