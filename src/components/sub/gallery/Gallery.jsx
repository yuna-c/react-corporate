import { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-component";
import Layout from "../../common/layout/Layout";
import "./Gallery.scss";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { useCustomText } from "../../../hooks/useText";
import Modal from "../../common/modal/Modal";

// npm i react-masonry-component@6
// https://www.flickr.com/services/api/

export default function Gallery() {
  // 초기 ID 값
  const myID = useRef("199645532@N06");
  const isUser = useRef(myID.current);
  const refNav = useRef(null);
  const refFrameWrap = useRef(null);
  const searched = useRef(false);
  const gap = useRef(30);

  const [Pics, setPics] = useState([]);
  const [Index, setIndex] = useState(0);
  const [Keyword, setKeyword] = useState("");

  const path = useRef(process.env.PUBLIC_URL);
  const shortenText = useCustomText("shorten");
  const [Open, setOpen] = useState(false);

  const activateBtn = (e) => {
    const btns = refNav.current.querySelectorAll("button");
    btns.forEach((btn) => btn.classList.remove("on"));
    e && e.target.classList.add("on");
  };

  const handleInterest = (e) => {
    if (e.target.classList.contains("on")) return;
    isUser.current = "";
    activateBtn(e);
    fetchFlickr({ type: "interest" });
    console.log("hot");
  };

  const handleMine = (e) => {
    if (e.target.classList.contains("on") || isUser.current === myID.current)
      return;
    isUser.current = myID.current;
    activateBtn(e);
    fetchFlickr({ type: "user", id: myID.current });
    console.log("mine");
  };

  const handleUser = (e) => {
    //isUSer값이 비어있기만 하면 중지
    if (isUser.current) return;
    isUser.current = e.target.innerText;
    activateBtn();
    fetchFlickr({ type: "user", id: e.target.innerText });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // console.log(e.target.children[0].value); submit 눌러야댐
    isUser.current = "";
    activateBtn();

    const keyword = e.target.children[0].value;
    if (!keyword.trim()) return; // 빈 값 삭제
    console.log(keyword);
    e.target.children[0].value = ""; // 엔터 키워드 지우기
    fetchFlickr({ type: "search", keyword: keyword });

    searched.current = true;
  };

  const openModal = (e) => {
    setOpen(true);
  };

  const fetchFlickr = async (opt) => {
    console.log("fetching again");
    const num = 100;
    const flickr_api = process.env.REACT_APP_FLICKR_API;

    // const baseURL = "https://www.flickr.com/services/rest/?method=";
    const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&extras=description,date_taken&method=`;
    const method_interest = "flickr.interestingness.getList";
    const method_user = "flickr.people.getPhotos";
    const method_search = "flickr.photos.search"; //search method 추가

    const interestURL = `${baseURL}${method_interest}`;
    const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
    const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`; //search url 추가

    let url = "";
    opt.type === "user" && (url = userURL);
    opt.type === "interest" && (url = interestURL);
    opt.type === "search" && (url = searchURL);

    const data = await fetch(url);
    const json = await data.json();

    // if (json.photos.photo.length === 0) {
    //   return alert("해당 검색어의 결과값이 없습니다");
    // }

    setPics(json.photos.photo);
    // console.log(json.photos.photo);
  };

  useEffect(() => {
    refFrameWrap.current.style.setProperty("--gap", gap.current + "px");
    fetchFlickr({ type: "user", id: myID.current });
    //fetchFlickr({ type: "search", keyword: "landscpe" });
  }, []);

  return (
    /* S : Gallery */
    <>
      <Layout title={"Gallery"}>
        <section className="visualBox">
          <div className="txt-area">
            <h3>NEW Watch GALLERY</h3>
            <p>
              Discover how we reimagined their brand identity, crafting a
              compelling narrative that authentically connects with their
              audience and propels their business forward.
            </p>
          </div>

          <div className="con-area">
            <div className="line-vertical"></div>

            <div className="info">
              <ul>
                <li>
                  <dl>
                    <dt>Client</dt>
                    <dd>LOREM IPSUM</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>YEAR</dt>
                    <dd>2023</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>SERVICES</dt>
                    <dd>GALLERY</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>WEBSITE</dt>
                    <dd>
                      <Link to="/">fylla-template.webflow.io</Link>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>TIMELINE</dt>
                    <dd>Lorem, ipsum dolor.</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>function</dt>
                    <dd>
                      search/<br></br> common Gallery/<br></br> user Gallery
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="line-holizontal"></div>

        <section className="galleryBox">
          <div className="txt-area">
            <div className="icon">
              <img src={`${path.current}/img/icon05.svg`} alt="icon05.svg" />
            </div>
            <h4>Gallery</h4>

            <article className="controls">
              <nav className="btnSet" ref={refNav}>
                <button onClick={handleInterest}>Interest Gallery</button>
                <button onClick={handleMine} className="on">
                  My Gallery
                </button>
              </nav>

              <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search" />
                <button className="btnSearch">
                  <LuSearch />
                </button>
              </form>
            </article>

            {/* <div className="btn-area">
            <div className="btn-inner">
              <button className="btn-active btn-inner-text">
                GET IN TOUCH
              </button>
              <button className="btn-active btn-inner-text-hover">
                GET IN TOUCH
              </button>
            </div>
          </div> */}
          </div>

          <div className="con-area" ref={refFrameWrap}>
            <div className="line-vertical"></div>

            <Masonry
              className={"frame"}
              options={{ transitionDuration: "0.5s", gutter: gap.current }}
            >
              {searched.current && Pics.length === 0 ? (
                <h2>해당 키워드에 대한 검색결과가 없습니다.</h2>
              ) : (
                Pics.map((pic, idx) => {
                  // console.log(pic.server);
                  return (
                    // URL : https://www.flickr.com/services/api/misc.urls.html
                    <article
                      key={pic.id}
                      onClick={() => {
                        setOpen(true);
                        setIndex(idx);
                      }}
                    >
                      <div className="picture">
                        <div className="pic">
                          <img
                            src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
                            alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
                          />
                        </div>
                      </div>

                      <div className="profile">
                        <h4>&lt;{pic.title}&gt;</h4>

                        {pic.description ? (
                          <p className="desc">
                            {shortenText(pic.description._content, 150)}
                          </p>
                        ) : (
                          ""
                        )}

                        <div className="user">
                          <img
                            src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
                            alt="사용자 프로필 이미지"
                            onError={(e) =>
                              e.target.setAttribute(
                                "src",
                                "https://www.flickr.com/images/buddyicon.gif"
                              )
                            }
                          />
                          <span onClick={handleUser}>{pic.owner}</span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </Masonry>
          </div>
        </section>

        {/* <div className='line-holizontal'></div> */}
      </Layout>

      <Modal Open={Open} setOpen={setOpen}>
        {Pics.length !== 0 && (
          <img
            src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`}
            alt={Pics[Index].title}
          />
        )}
      </Modal>
    </>
    /* // E : Gallery */
  );
}
