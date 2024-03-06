import { useEffect, useState } from "react";
import axios from "axios";
import { API_PATH, CONFIG } from "../../constants/constants";

const VisaClient = () => {
  const [search, setSearch] = useState("");
  const [filiall, setFiliall] = useState("");
  const [data, setData] = useState([]);
  const [filialData, setFiliallData] = useState([]);

  useEffect(() => {
    axios
      .get(
        API_PATH + `main/client-full?search=${search}&?filial=${filiall}`,
        CONFIG
      )
      .then((res) => {
        setData(res.data);
      });
    axios.get(API_PATH + "main/branch-list/", CONFIG).then((res) => {
      setFiliallData(res.data);
    });
  }, [search, filiall]);

  return (
    <>
      <div className="Product">
        <div className="prod_main">
          <div className="dash_name_box">
            <div className="dash_name">Mijozlar ro’yhati</div>
            <div className="d-flex gap-3">
              {/* <div className="my_select">
                <select
                  value={filiall}
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
              </div> */}
              <div className="dash_inp">
                <img src="/img/icon_search.png" alt="" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Qidirish"
                />
              </div>
            </div>
          </div>
          <div className="prod_text">
            <div className="prod_text_h prod_text_h1">#</div>
            <div className="prod_text_h prod_text_h2">F.I.O</div>
            <div className="prod_text_h prod_text_h3">Pass Num</div>
            <div className="prod_text_h prod_text_h4">Narxi</div>
            <div className="prod_text_h prod_text_h4">Paket</div>
            <div className="prod_text_h prod_text_h5">Holati</div>
            <div className="prod_text_h prod_text_h6">Pass File</div>
            <div className="prod_text_h prod_text_h7">Visa</div>
            <div className="prod_text_h prod_text_h8">Tel Num</div>
            <div className="prod_text_h prod_text_h9">Joylashuv</div>
            <div className="prod_text_h prod_text_h10">Hudud</div>
            <div className="prod_text_h prod_text_h11 text-center">Filiall</div>
          </div>
          {data?.map((item, index) => (
            <div key={index} className="prod_text2">
              <div className="prod_text_p prod_text_h1">{index + 1}</div>
              <div className="prod_text_p prod_text_h2">{item.full_name}</div>
              <div className="prod_text_p prod_text_h3">
                {item.passport_seria}
              </div>
              <div className="prod_text_p prod_text_h4">$ {item.price}</div>
              <div className="prod_text_p prod_text_h4">
                {item.get_paket_name}
              </div>
              <div className="prod_text_p prod_text_h5"> {item.status}</div>
              <div className="prod_text_p prod_text_h6">
                <a href={item.passport_file}>
                  <span>file</span>
                </a>
              </div>
              <div className="prod_text_p prod_text_h7">
                <a href={item.visa_file}>
                  <span>file</span>
                </a>
              </div>
              <div className="prod_text_p prod_text_h8">{item.phone}</div>
              <div className="prod_text_p prod_text_h9">{item.stay}</div>
              <div className="prod_text_p prod_text_h10">{item.country}</div>
              <div className="prod_text_p prod_text_h11">
                {item.branch_name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VisaClient;
