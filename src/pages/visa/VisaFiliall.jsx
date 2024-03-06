import { useEffect, useState } from "react";
import axios from "axios";
import { API_PATH, CONFIG } from "../../constants/constants";

const VisaFilial = () => {
  const [mod2, setMod2] = useState();
  const [data, setData] = useState([]);
  const [branchName, setBranchName] = useState();
  const [branchAddress, setBranchAddress] = useState();
  const [branchPhone, setBranchPhone] = useState();
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(API_PATH + `main/branch-list?search=${search}`, CONFIG)
      .then((res) => {
        setData(res.data);
      });
  }, [search]);

  const addFilial = () => {
    axios
      .post(
        API_PATH + "main/branch-create/",
        {
          name: branchName,
          address: branchAddress,
          phone: branchPhone,
        },
        CONFIG
      )
      .then(() => {
        setMod2(false);
        document.location.reload();
      });
  };

  return (
    <>
      <div className="Filial">
        <div className="dash_name_box">
          <div className="dash_name">Filiallar</div>
          <div className="d-flex gap-3">
            <div className="dash_inp">
              <img src="/img/icon_search.png" alt="" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Qidirish"
              />
            </div>
            {/* <div onClick={() => setMod2(!mod2)} className="prod_btn">
              <img src="/img/icon_plus.png" alt="" />
              Filiall qo'shish
            </div> */}
          </div>
        </div>

        <div className="fil_box">
          {data?.map((item, index) => (
            <div key={index} className="fil_main">
              <div className="fil_h">{item.name}</div>
              <div className="fil_p">{item.address}</div>
              <div className="d-flex mt-2 align-items-center justify-content-between">
                <div className="fil_text">
                  <div className="fil_p_2">
                    Ishchilar soni: {item.get_count} ta
                  </div>
                  <div className="fil_h_2">{item.get_head_name}</div>
                </div>
                {/* <Link className="mt-5" to="/"> */}
                <img src="/img/icon_right.png" alt="" />
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>

        <div className={`modalcha2 ${mod2 ? "active" : ""}`}>
          <div className="mod_2_box">
            <div className="mod_2_name">
              <div className="mod_2_name_h">Filiall qo’shish</div>
              <img
                onClick={() => setMod2(!mod2)}
                src="/img/icon_x.png"
                alt=""
              />
            </div>
            <form onSubmit={addFilial} action="">
              <div className="mod_2_inp">
                <div className="mod_2_inp_h">Filial nomi</div>
                <input
                  required
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="Chorsu Filiali"
                  type="text"
                />
              </div>
              <div className="mod_2_inp">
                <div className="mod_2_inp_h">Filiall adressi </div>
                <input
                  required
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  placeholder="Toshkent shahar Navoiy ko'chasi"
                  type="text"
                />
              </div>
              <div className="mod_2_inp">
                <div className="mod_2_inp_h">Teleon raqami</div>
                <input
                  required
                  placeholder="+998977165434"
                  type="text"
                  value={branchPhone}
                  onChange={(e) => setBranchPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="mod_2_btn">
                Filiall {"qo'shish"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisaFilial;
