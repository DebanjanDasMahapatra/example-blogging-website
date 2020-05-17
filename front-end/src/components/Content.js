import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import JoditEditor from "../editor";

// const button = () => {
//   return <button>Click to upload </button>;
// };

export default class From extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        readonly: false,
        toolbar: true,
        enableDragAndDropFileToEditor: true,

        uploader: {
          url: "http://localhost:3030/",
          pathVariableName: "path",

          filesVariableName: function (t) {
            return "file";
          },
          baseurl: "/upload",
          button: true,
          format: "json",
          prepareData: function (data) {
            return data;
          },
          isSuccess: function (resp) {
            console.log("isSuccess", resp);
            return !resp.error;
          },
          getMsg: function (resp) {
            return resp.msg.join !== undefined ? resp.msg.join(" ") : resp.msg;
          },
          process: function (resp) {
            console.log(resp);
            return {
              files: resp.files || [],
              path: resp.path,
              baseurl: resp.baseUrl,
              error: resp.error,
              msg: resp.msg,
            };
          },
          defaultHandlerSuccess: function (t) {
            var e = this;
            try {
              t.files &&
                t.files.length &&
                t.files.forEach(function (o, i) {
                  var n = ["img", "src"];

                  let r = n[0];
                  let a = n[1];
                  let s = e.jodit.create.inside.element(r);
                  s.setAttribute(a, t.baseurl + t.path + o);

                  "img" === r
                    ? e.jodit.selection.insertImage(
                        s,
                        null,
                        e.jodit.options.imageDefaultWidth
                      )
                    : e.jodit.selection.insertNode(s);
                });
            } catch (err) {
              console.log(err);
            }
          },

          error: function (e) {
            console.log("error", e);
            // this.events.fire("errorMessage", [e.getMessage(), "error", 4000]);
          },
        },
      },

      value: "",
      spin: 1,
      checkedA: true,
    };

    this.data = "";
  }

  handleChange = (event) => {
    let checkedValue = event.target.checked;
    this.setState((prevState) => {
      let config = {
        ...this.state.config,
        readonly: !prevState.config.readonly,
        toolbar: !prevState.config.toolbar,
      };
      return {
        checkedA: checkedValue,
        value: this.data,
        config,
      };
    });
  };

  handleTextChange = (data) => {
    this.data = data;
  };

  render() {
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={1}>
            <Switch
              checked={this.state.checkedA}
              onChange={this.handleChange}
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Grid>
          <Grid item xs={9}>
            <JoditEditor
              value={this.state.value}
              config={this.state.config}
              onChange={this.handleTextChange}
            />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    );
  }
}
