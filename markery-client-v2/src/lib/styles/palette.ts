const palette = {
  /* Base */
  text: "#3d556b",
  label: "#0c344b",
  background: "#eff3f5",
  inputInternalFill: "#e8f0fe",
  border: "#ccd9df",
  divider: "#d9e3ed",
  error: "#ff4f56",
  backdrop: "rgba(0, 0, 0, 0.3)",
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
  grey9: "#212529",
  /* Green */
  green0: "#F3FFFB",
  green1: "#C3FAE8",
  green2: "#96F2D7",
  green3: "#63E6BE",
  green4: "#38D9A9",
  green5: "#20C997",
  green6: "#12B886",
  green7: "#0CA678",
  green8: "#099268",
  green9: "#087F5B",
  /* Blue */
  blue0: "#e3fafc",
  blue1: "#c5f6fa",
  blue2: "#99e9f2",
  blue3: "#66d9e8",
  blue4: "#3bc9db",
  blue5: "#22b8cf",
  blue6: "#15aabf",
  blue7: "#1098ad",
  blue8: "#0c8599",
  blue9: "#0b7285"
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
    backgroundColor: "#8fa6b2",
    hoverBackgroundColor: "#839caa"
  },
  darkGrey: {
    color: "white",
    backgroundColor: "#8fa6b280",
    hoverBackgroundColor: "#ADB5BD"
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
    hoverBackgroundColor: "#ff8787"
  },
  pink: {
    color: "white",
    backgroundColor: "#D645A7",
    hoverBackgroundColor: "#dd66b7"
  },
  greyToRed: {
    color: "white",
    backgroundColor: "#8fa6b280",
    hoverBackgroundColor: "#ff4f56"
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
  lightBlue: {
    color: "#00abbf",
    backgroundColor: "#dcf9fd"
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
