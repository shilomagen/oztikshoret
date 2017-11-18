import React, { Component } from "react";
import axios from "axios";
import { CustomInput, CustomTextArea } from "./CustomInput/CustomInput";
import { AppStatus, SocketEvents } from "../../common/constants";
import io from "socket.io-client";
import ReactLoading from "react-loading";
import App from "../../App";

const StatusStrings = {
  [AppStatus.DONE]: "כל השלבים עברו בהצלחה, נשלח ללקוח!",
  [AppStatus.CLEANING]: "מנקים קבצים זמניים...",
  [AppStatus.SENDING_MAIL]: "שולחים את המייל...",
  [AppStatus.CREATING_PDF]: "יוצרים את הצעת המחיר...",
  [AppStatus.PDF_CREATED]: "הצעת המחיר נוצרה בהצלחה!",
  [AppStatus.SENT]: "נשלח!",
  [AppStatus.ERROR]: "קרתה תקלה, דבר עם הבן שלך"
};

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {
      to: "",
      subject: "",
      body: "",
      email: "",
      status: AppStatus.INIT
    };
    this.socket.on(SocketEvents.STATUS_CHANGE, ({ status }) =>
      this.setAppState(status)
    );
  }

  setAppState = status => {
    return this.setState({ status });
  };
  handleFormChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  async sendForm(e) {
    e.preventDefault();
    const { to, subject, body, email } = this.state;
    try {
      await axios.post("/api/create-offer", {
        date: new Intl.DateTimeFormat("he", {
          year: "numeric",
          month: "short",
          day: "numeric"
        }).format(new Date()),
        to,
        subject,
        email,
        body: body.replace(/(?:\r\n|\r|\n)/g, "<br />")
      });
      this.resetForm();
    } catch (e) {
      this.setState({ status: AppStatus.ERROR });
    }
  }
  getStatusContainer() {
    const { status } = this.state;
    return (
      <div
        className={`
          status alert ${
            status === AppStatus.ERROR ? "alert-danger" : "alert-primary"
          }`}
        role="alert"
      >
        <span>{StatusStrings[status]}</span>
        <div className="loader-container">
          {status !== AppStatus.DONE &&
            status !== AppStatus.ERROR && (
              <ReactLoading type="bubbles" color="#444" />
            )}
        </div>
      </div>
    );
  }

  resetForm() {
    this.setState({
      to: "",
      subject: "",
      body: "",
      email: ""
    });
  }

  render() {
    const { status } = this.state;
    return (
      <div className="container welcome text-right mt-1">
        <h1>מערכת הצעות מחיר - עוז תקשורת</h1>
        <form>
          <CustomInput
            placeholder="לכבוד מי הצעת המחיר?"
            id="to"
            label="לכבוד"
            onChange={this.handleFormChange}
            value={this.state.to}
          />
          <CustomInput
            placeholder="אנא הזן את הנדון"
            id="subject"
            label="הנדון"
            onChange={this.handleFormChange}
            value={this.state.subject}
          />
          <CustomTextArea
            placeholder="אנא הזן את גוף הצעת המחיר, תוך שמירה על סימני פיסוק ועברית תקינה"
            id="body"
            label="גוף הצעת המחיר"
            onChange={this.handleFormChange}
            value={this.state.body}
          />
          <CustomInput
            placeholder="כתובת המייל של הנמען"
            id="email"
            label="נמען"
            type="email"
            onChange={this.handleFormChange}
            value={this.state.email}
          />
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={e => this.sendForm(e)}
          >
            שגר הצעת מחיר
          </button>
        </form>
        {status !== AppStatus.INIT && (
          <div className="mt-3">{this.getStatusContainer()}</div>
        )}
      </div>
    );
  }
}
