import React from "react";
import axios from "axios";
import Toast from "./Toast";
import avatars from "../../assets/js/avatars.json";

const ChangeAvatar = (props) => {
  const Endpoint = `http://localhost:5000`;
  const { auth, catchErrors, saveLoginData } = props;

  const [{ image_url, loading }, changeAvatar] = React.useState({
    image_url: auth.image_url,
    loading: false,
  });

  const uploadAvatar = async () => {
    if (!image_url.length) {
      Toast("info", "Select an avatar");
      return;
    }
    changeAvatar((key) => ({
      ...key,
      loading: true,
    }));
    try {
      const res = await axios({
        method: "POST",
        url: `${Endpoint}/users/change-avatar`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: { image_url },
      });
      await saveLoginData({ ...auth, image_url });
      Toast("success", res.data.status);
      changeAvatar((key) => ({
        ...key,
        loading: false,
      }));
    } catch (err) {
      changeAvatar((key) => ({
        ...key,
        loading: false,
      }));
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      catchErrors(err.response);
    }
  };

  const loader = (
    <div className="loader">
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="row avatar-showcase">
        {avatars.map((key) => (
          <div className="col s6 avatar" key={key.id}>
            <img
              src={key.url}
              alt={key.id}
              className={image_url === key.url ? "picked-img" : ""}
              onClick={(e) =>
                changeAvatar((i) => ({ ...i, image_url: key.url }))
              }
            />
          </div>
        ))}
      </div>

      {loading ? loader : ""}

      <div className="signin-btn">
        <button onClick={(e) => uploadAvatar()} disabled={loading}>
          Change
        </button>
      </div>
    </>
  );
};

export default ChangeAvatar;
