const palette = {
  /* Base */
  text: "#3d556b",
  label: "#0c344b",
  background: "#eff3f5",
  inputInternalFill: "#e8f0fe",
  border: "#ccd9df",
  error: "#ff4f56",
  /* Grey */
  grey0: "#F8F9FA",
  grey1: "#F1F3F5",
  grey2: "#E9ECEF",
  grey3: "#DEE2E6",
  grey4: "#CED4DA",
  grey5: "#ADB5BD",
  grey6: "#868E96",
  grey7: "#495057",
  grey8: "#343A40",
  grey9: "#212529"
};

type buttonColorMapType = {
  [color: string]: {
    color: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
  };
};

const buttonColorMap: buttonColorMapType = {
  lightGrey: {
    color: "white",
    backgroundColor: "#ccd9df4d",
    hoverBackgroundColor: "#ccd9df99"
  },
  grey: {
    color: "white",
    backgroundColor: "#8fa6b233",
    hoverBackgroundColor: "#8fa6b280"
  },
  green: {
    color: "white",
    backgroundColor: "#15BD76",
    hoverBackgroundColor: "#19e28d"
  },
  lightBlue: {
    color: "white",
    backgroundColor: "#00CCE4",
    hoverBackgroundColor: "#0ee6ff"
  },
  blue: {
    color: "white",
    backgroundColor: "#0F7AD8",
    hoverBackgroundColor: "#208ff0"
  },
  red: {
    color: "white",
    backgroundColor: "#ff4f56",
    hoverBackgroundColor: "#ff6b6b"
  },
  pink: {
    color: "white",
    backgroundColor: "#D645A7",
    hoverBackgroundColor: "#dd66b7"
  }
};

type TagColorMapType = {
  [color: string]: {
    color: string;
    backgroundColor: string;
  };
};

const TagColorMap: TagColorMapType = {
  green: {
    color: "#15bd76",
    backgroundColor: "#e2f8ee"
  },
  blue: {
    color: "#0f7ad8",
    backgroundColor: "#d8ecfd"
  },
  red: {
    color: "",
    backgroundColor: ""
  }
};

export { palette, buttonColorMap, TagColorMap };
