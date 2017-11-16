import React, { Component } from "react";
import axios from "axios";
import { CustomInput, CustomTextArea } from "./CustomInput/CustomInput";
import { AppStatus } from "../../common/AppStatus";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: "",
      subject: "",
      body: "",
      email: "",
      status: AppStatus.INIT
    };
  }

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

  resetForm() {
    this.setState({
      to: "",
      subject: "",
      body: "",
      email: "",
      status: AppStatus.SENT
    });
  }

  render() {
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
        <div className="mt-3">
          {this.state.status === AppStatus.SENT && (
            <div className="alert alert-primary" role="alert">
              הבקשה שוגרה והיא בדרך ללקוח
            </div>
          )}
          {this.state.status === AppStatus.ERROR && (
            <div className="alert alert-danger" role="alert">
              קרתה תקלה, דבר עם הבן שלך
            </div>
          )}
        </div>
      </div>
    );
  }
}
