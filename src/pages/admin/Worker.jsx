import axios from "axios";
import { useEffect, useState } from "react";
import { API_PATH, CONFIG } from "../../constants/constants";
import { toast } from "react-toastify";

const Worker = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filial, setFiliall] = useState("");
  const [filialData, setFiliallData] = useState([]);
  const [mod, setMod] = useState(false);

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [filial_id, setFilial_id] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const userAdd = () => {
    axios
      .post(
        API_PATH + "account/register/",
        {
          phone: phone,
          name: userName,
          branch: filial_id,
          password: password,
          role: role,
        },
        CONFIG
      )
      .then(() => {
        toast("Foydalanuvchi muvaffaqiyatli qo'shildi");
        setMod(!mod);
        document.location.reload();
      })
      .catch((err) => {
        toast("Bu telefon raqam orqali user ro'yhatdan o'tgan");
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        API_PATH + `account/list-workers?search=${search}&?filiall=${filial}`,
        CONFIG
      )
      .then((res) => {
        setData(res.data);
      });
    axios.get(API_PATH + "main/branch-list/", CONFIG).then((res) => {
      setFiliallData(res.data);
    });
  }, [search, filial]);

  return (
    <>
      <div className="Worker">
        <div className="prod_main">
          <div className="dash_name_box">
            <div className="dash_name">Ishchilar Ro’yhati</div>
            <div className="d-flex flex-lg-row flex-column gap-3">
              <div className="my_select">
                <select
                  value={filial}
                  onChange={(e) => setFiliall(e.target.value)}
                  className="dash_sel"
                  name=""
                  id=""
                >
                  {filialData?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dash_inp">
                <img src="/img/icon_search.png" alt="" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Qidirish"
                />
              </div>
              <div onClick={() => setMod(!mod)} className="prod_btn">
                <img src="/img/icon_plus.png" alt="" />
                Ishchi {"qo'shish"}
              </div>
            </div>
          </div>

          <div className="prod_text">
            <div className="prod_text_h prod_text_h1">#</div>
            <div className="prod_text_h prod_text_h2">F.I.O</div>
            <div className="prod_text_h prod_text_h3">Tel Num</div>
            <div className="prod_text_h prod_text_h2">Filial</div>
            <div className="prod_text_h prod_text_h3">Data registr</div>
            <div className="prod_text_h prod_text_h2">Lavozim</div>
          </div>

          {data?.map((item, index) => (
            <div key={index} className="prod_text2">
              <div className="prod_text_p prod_text_h1">{index + 1}</div>
              <div className="prod_text_p prod_text_h2 prod_name_curs">
                {item?.name}
              </div>
              <div className="prod_text_p prod_text_h3">{item.phone}</div>
              <div className="prod_text_p prod_text_h2">
                {item.get_branch_name}
              </div>
              <div className="prod_text_p prod_text_h3">{item.created_at}</div>
              <div className="prod_text_p prod_text_h2">{item.role}</div>
            </div>
          ))}
          {mod ? (
            <>
              <div className={`modalcha`}>
                <div className="d-flex flex-column justify-content-between h-100">
                  <form onSubmit={userAdd} action="">
                    <div className="mod_text mt-3">
                      <div className="mod_name mb-3">
                        <div className="mod_name_h">Ishchi Qo’shish</div>
                        <img
                          onClick={() => setMod(!mod)}
                          className={``}
                          src="/img/icon_x.png"
                          alt=""
                        />
                      </div>
                      <div className="mod_text_box mb-3">
                        <div className="mod_text_h">Ismi </div>
                        <input
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Kasimov Mahkam"
                          required
                          className="mod_text_inp"
                          type="text"
                        />
                      </div>
                      <div className="mod_text_box mb-3">
                        <div className="mod_text_h">
                          Telefon Raqami (Login){" "}
                        </div>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+998977165434"
                          required
                          className="mod_text_inp"
                          type="text"
                        />
                      </div>
                      <div className="mod_text_box mb-3">
                        <div className="mod_text_h">Filiall</div>
                        <select
                          onChange={(e) => setFilial_id(e.target.value)}
                          className="mod_text_inp"
                          name=""
                          id=""
                        >
                          <option value=""></option>
                          <option value="" selected disabled hidden>
                            Tanlang
                          </option>
                          {filialData?.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mod_text_box mb-3">
                        <div className="mod_text_h">Ishchining Roli</div>
                        <select
                          onChange={(e) => setRole(e.target.value)}
                          className="mod_text_inp"
                          name=""
                          id=""
                        >
                          <option value="" selected disabled hidden>
                            Tanlang
                          </option>
                          <option value="Operator">Operator</option>
                        </select>
                      </div>
                      <div className="mod_text_box mb-3">
                        <div className="mod_text_h">Ishchining Paroli </div>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="123456"
                          minLength={6}
                          maxLength={20}
                          required
                          className="mod_text_inp"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="mod_btn">
                      <button type="submit">
                        <img src="/img/icon_plus.png" alt="" />
                        Ishchi qo’shish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Worker;
