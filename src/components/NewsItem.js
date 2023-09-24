import React, { Component } from "react";
import './components.css';

export class NewsItem extends Component {
  // yeh class based component hain toh mujhe props  this.props karke milenge
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } =
      this.props;
    // newsurl unique identify karega ki ab yeh news aayegii mtlb har news ka url alag hoga
    // yeh jo mein uppar likh rah ahoon mtlb inhe mein destructuring ki madat se props se nikalunga news item component se loonga
    return (
      <div className="my-3">
        <div className="card shadow p-2 mb-3 bg-body-tertiary rounded">
          <div
            style={{
              display: "flex",
              justifycontent: "flex-end",
              position: "absolute",
              right: "0",

            }}
          >
            <span className=" badge rounded-pill bg-danger">{source} </span>
          </div>
          <img
            src={
              !imageUrl ? "https://images.wsj.net/im-852270/social" : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          {/* // mein image ke lia bhi aise hi banaunga ki agar imageurl null hain toh default use karurnge agar null nhi toh sahi waala use kareneg */}
          <div className="card-body">
            <h5 className="card-title">{title}....</h5>
            <p className="card-text">{description}....</p>
            <p class="card-text">
              <small class="text-body-secondary">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-secondary ju"
            >

              Read more
              {/* date mein maine object banaya hain taaki vo time ko dhag se dkhaaye gmt mein */}
              {/* // target = _blank karne se nhi tab mein article khulta hain  aur author waale mein maine ternary operator lagay ahain agar null ho toh unknown likha aaj aye*/}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
