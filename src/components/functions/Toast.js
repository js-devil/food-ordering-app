import iziToast from "izitoast";
import "../../assets/css/Toast.css";

iziToast.settings({
  timeout: 3000,
  titleSize: "18px",
  transitionIn: "flipInX",
  progressBarColor: "#443c87",
  position: "topRight",
  transitionOut: "flipOutX"
});

const Toast = (type, title) => {
  iziToast[type]({
    title
  });
};

export default Toast;
