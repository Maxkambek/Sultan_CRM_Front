import axios from "axios";
import { useEffect, useState } from "react";
import { API_PATH, CONFIG, IMAGE_CONFIG } from "../../constants/constants";
import { toast } from "react-toastify";

const Profile = () => {
  const [data, setData] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    axios.get(API_PATH + "account/user-rud/", CONFIG).then((res) => {
      setData(res.data);
    });
  }, []);

  const updateUserInfo = () => {
    const formData = new FormData();
    formData.append("name", name ? name : data.name);
    image ? formData.append("avatar", image) : "";
    axios
      .patch(API_PATH + "account/user-rud/", formData, IMAGE_CONFIG)
      .then(() => {
        toast("Muvaffaqiyatli yangilandi");
        document.location.reload();
      })
      .catch((err) => {
        toast(err);
      });
  };

  return (
    <>
      <div className="Profile">
        <div className="profile_nav">Mening profilim</div>
        <div className="profile_header">
          <div className="prof_h_box">
            <div className="prof_img">
              <label htmlFor="fileField">
                {" "}
                <img
                  className="user_image"
                  src={
                    image
                      ? URL.createObjectURL(image)
                      : data?.avatar
                      ? data.avatar
                      : "/img/user.png"
                  }
                  alt=""
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                hidden
                type="file"
                id="fileField"
                name="file"
                accept="image/*"
              ></input>

              <input type="file" hidden />
            </div>
          </div>
          <div className="prof_image_edit">Profil rasmini {"o'zgartirish"}</div>
        </div>
        <div className="profile_main">
          <div className="prof_main_item">
            <div className="prof_item_h">Ismingiz</div>
            <div className="prof_item_inp">
              <input
                defaultValue={data?.name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
          </div>
          <div className="prof_main_item">
            <div className="prof_item_h">Login (Tel.)</div>
            <div className="prof_item_inp">
              <input value={data?.phone} disabled type="text" />
            </div>
          </div>
          <div className="prof_main_item">
            <div className="prof_item_h">Rolingiz</div>
            <div className="prof_item_inp">
              <input disabled value={data?.role} type="text" />
            </div>
          </div>
          <div className="prof_main_item">
            <div className="prof_item_h">Filail</div>
            <div className="prof_item_inp">
              <input disabled value={data?.get_branch_name} type="text" />
            </div>
          </div>
          <div className="save_btn">
            <div onClick={() => updateUserInfo()} className="prof_main_btn">
              Saqlash
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
