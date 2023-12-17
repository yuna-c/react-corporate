import { useRef, useState } from "react";
import Layout from "../../common/layout/Layout";
import "./Community.scss";

export default function Community() {
  const path = useRef(process.env.PUBLIC_URL);

  const [Post, setPost] = useState([]); //핸들링 위한 state
  const refTit = useRef(null);
  const refEmail = useRef(null);
  const refCon = useRef(null);

  const resetPost = () => {
    refTit.current.value = "";
    refEmail.current.value = "";
    refCon.current.value = "";
  };

  const createPost = () => {
    setPost([
      {
        title: refTit.current.value,
        email: refEmail.current.value,
        content: refCon.current.value,
        // date: new Date(korTime),
      },
      ...Post,
    ]);
  };

  const handleSizeHeight = () => {
    refCon.current.style.height = "auto";
    refCon.current.style.height = refCon.current.scrollHeight + "px";
  };

  console.log(Post);

  return (
    <Layout title={"Community"}>
      <div className="visualBox">
        <div className="txt-area">
          <h3>Feel free to ask questions</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            dolorum fugit illo, qui nihil quae sed? Quis, beatae quam architecto
            neque adipisci nulla repellat quisquam quae ducimus totam non
            obcaecati?Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus dolorum fugit illo, qui nihil quae sed? Quis, beatae quam
            architecto neque adipisci nulla repellat quisquam quae ducimus totam
            non obcaecati?
          </p>
        </div>

        <div className="img-area">
          <img src={`${path.current}/img/img1.jpg`} alt={path.current} />
        </div>
      </div>

      <div className="line-holizontal"></div>

      <div className="contentBox">
        <div className="inputBox">
          <div className="txt-area">
            <h4>Creating true brands together.</h4>

            <div className="sns-area">
              <h5>FIND US ON</h5>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      window.open(`https://twitter.com`);
                    }}
                  >
                    Tw
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.open("https://www.facebook.com/");
                    }}
                  >
                    In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.open("https://www.instagram.com/");
                    }}
                  >
                    Fa
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="form-area">
            {/* form tag 있으면 전송되면서 새로고침 됨 */}
            <label>Title</label>
            <input
              type="text"
              placeholder="Your Title"
              name="title"
              ref={refTit}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              ref={refEmail}
            />
            <label>Message</label>
            <textarea
              placeholder="Your Message"
              rows={15}
              maxLength={"1500"}
              name="content"
              ref={refCon}
              onChange={handleSizeHeight}
            ></textarea>

            <div className="btn-area">
              <button className="btn" onClick={resetPost}>
                DELETE
              </button>
              <button className="btn" onClick={createPost}>
                SUBMIT
              </button>
            </div>
          </div>
        </div>

        <div className="line-holizontal"></div>

        <div className="showBox">
          {Post.map((el, idx) => {
            return (
              <article key={el + idx}>
                <div className="txt-area">
                  <h6>{el.title}</h6>
                  <strong>{el.email}</strong>
                  <p>{el.content}</p>
                </div>
                <div className="btb-area">
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="line-holizontal"></div>
    </Layout>
  );
}
