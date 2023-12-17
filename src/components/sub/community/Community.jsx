import { useRef } from "react";
import Layout from "../../common/layout/Layout";
import "./Community.scss";

export default function Community() {
  const path = useRef(process.env.PUBLIC_URL);
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
          <form className="form-area">
            <input type="text" placeholder="Your Title" name="tit" />
            <input type="text" placeholder="Your Email" name="tit" />

            <textarea
              placeholder="Your Message"
              rows="18"
              maxLength={"5000"}
              name="con"
            ></textarea>

            <div className="btn-area">
              <button className="btn">DELETE</button>
              <button className="btn">SUBMIT</button>
            </div>
          </form>
        </div>

        <div className="showBox"></div>
      </div>

      <div className="line-holizontal"></div>
    </Layout>
  );
}
