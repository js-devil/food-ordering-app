import iziToast from "izitoast";
import "../../assets/css/Toast.css";

const func = (instance, toast) => {
  instance.hide({ transitionOut: "fadeOut" }, toast);
};
const Confirm = title => {
  iziToast.question({
    title,
    overlay: true,
    id: "question",
    position: "center",
    buttons: [
      ["<button><b>Yes<b></button>", func, true],
      ["<button><b>No<b></button>", func]
    ]
  });
};

export default Confirm;
