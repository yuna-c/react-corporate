import { useEffect, useRef, useState } from "react";
import { useCustomText } from "../../../hooks/useText";
import Layout from "../../common/layout/Layout";
import "./Community.scss";

export default function Community() {
  const path = useRef(process.env.PUBLIC_URL);
  // const customText = useCustomText("combined");
  const customText = useCustomText("combined");
  // console.log(customText);

  const getLocalData = () => {
    const data = localStorage.getItem("post");
    if (data) return JSON.parse(data);
    // JSON.parse 문자열의 구문을 분석, Js 값이나 객체를 생성
    else return [];
  };

  const [Post, setPost] = useState(getLocalData()); //핸들링 위한 state
  const refTit = useRef(null);
  const refEmail = useRef(null);
  const refCon = useRef(null);

  const resetPost = () => {
    refTit.current.value = "";
    refEmail.current.value = "";
    refCon.current.value = "";
  };

  const createPost = () => {
    if (!refTit.current.value.trim()) {
      return alert("제목을 입력하세요.");
    }
    if (!refEmail.current.value.trim()) {
      return alert("이메일을 입력하세요.");
    }
    if (!refCon.current.value.trim()) {
      return alert("본문을 입력하세요.");
    }
    if (
      !refTit.current.value.trim() ||
      !refEmail.current.value.trim() ||
      !refCon.current.value.trim()
    ) {
      resetPost();
    }
    const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
    setPost([
      {
        title: refTit.current.value,
        email: refEmail.current.value,
        content: refCon.current.value,
        date: new Date(korTime),
      },
      ...Post,
    ]);
    // resetPost();
  };

  const deletePost = (delIndex) => {
    if (!window.confirm("정말 해당 게시글을 삭제하겠습니까?")) return;
    setPost(Post.filter((_, idx) => delIndex !== idx));
    // filter(callbackFn, thisArg) : 메서드는 주어진 배열의 일부에 대한 얕은 복사본을 생성, 주어진 배열에서 제공된 함수에 의해 구현된 테스트를 통과한 요소로만 필터링
  };

  const enableUpdate = (editIndex) => {
    setPost(
      Post.map((el, idx) => {
        if (editIndex === idx) el.enableUpdate = true;
        return el;
      })
    );
    console.log("update");
  };

  const disableUpdate = (editIndex) => {
    setPost(
      Post.map((el, idx) => {
        if (editIndex === idx) el.enableUpdate = false;
        return el;
      })
    );
  };

  const handleSizeHeight = () => {
    refCon.current.style.height = "auto";
    refCon.current.style.height = refCon.current.scrollHeight + "px";
  };

  useEffect(() => {
    localStorage.setItem("post", JSON.stringify(Post));
  }, [Post]);
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

          <form className="form-area" onSubmit={(e) => e.preventDefault()}>
            {/* form tag 있으면 전송되면서 새로고침 됨 */}
            <label>Title</label>
            <input
              type="text"
              placeholder="Your Title"
              name="title"
              required="required"
              ref={refTit}
            />
            <label>Email</label>
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              required="required"
              ref={refEmail}
            />
            <label>Message</label>
            <textarea
              placeholder="Your Message"
              rows={15}
              maxLength={"1500"}
              name="content"
              required="required"
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
          </form>
        </div>

        <div className="line-holizontal"></div>

        <div className="showBox">
          {Post.map((el, idx) => {
            const date = JSON.stringify(el.date);
            const strDate = customText(date.split("T")[0].slice(1), ".");
            const strDate2 = customText(date.split("Z")[0].slice(12), ":");
            const time = Math.floor(strDate2);
            // console.log(strDate2);

            if (el.enableUpdate) {
              return (
                <article key={el + idx}>
                  <div className="txt-area">
                    <h6>{el.title}</h6>
                    <strong>{el.email}</strong>
                    <p>{el.content}</p>
                    <span>{strDate}</span>
                  </div>

                  <div className="btn-area">
                    <button className="btn" onClick={() => enableUpdate(idx)}>
                      Edit
                    </button>
                    <button className="btn">Update</button>
                  </div>

                  <div className="line-holizontal"></div>
                </article>
              );
            } else {
              return (
                <article key={el + idx}>
                  <div className="txt-area">
                    <h6>{el.title}</h6>
                    <strong>{el.email}</strong>
                    <p>{el.content}</p>
                    <span>{strDate}</span>
                  </div>

                  <div className="btn-area">
                    <button className="btn" onClick={() => enableUpdate(idx)}>
                      Edit
                    </button>
                    <button className="btn" onClick={() => deletePost(idx)}>
                      Delete
                    </button>
                  </div>

                  <div className="line-holizontal"></div>
                </article>
              );
            }
          })}
        </div>
      </div>
    </Layout>
  );
}
