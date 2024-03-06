import axios from "axios";
import { useEffect, useState } from "react";
import {} from "react";
import { Link } from "react-router-dom";
import { API_PATH, CONFIG } from "../../constants/constants";

const VisaPacket = () => {
  const [paketData, setPaketData] = useState();
  const [filterType, setFilterType] = useState("");
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("");

  const getPakets = () => {
    axios
      .get(
        API_PATH +
          `main/paket-list?search=${search}&paket_type=${filterType}&month=${month}`,
        CONFIG
      )
      .then((res) => {
        setPaketData(res.data);
      });
  };

  useEffect(() => {
    getPakets();
  }, [search, month, filterType]);

  return (
    <>
      <div className="Packet">
        <div className="dash_name_box">
          <div className="dash_name">Paketlar Ro'yhati</div>
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
        <div className="pac_filtr_box">
          <select
            defaultValue="Standard"
            onChange={(e) => setFilterType(e.target.value)}
            className="pac_sel"
            name=""
            id=""
          >
            <option value="Standard">Standard</option>
            <option value="Comfort">Comfort</option>
            <option value="VIP">VIP</option>
          </select>
          <select
            defaultValue="Oy"
            onChange={(e) => setMonth(e.target.value)}
            className="pac_sel"
            name=""
            id=""
          >
            <option value="01">Yanvar</option>
            <option value="02">Fevral</option>
            <option value="03">Mart</option>
            <option value="04">Aprel</option>
            <option value="05">May</option>
            <option value="06">Iyun</option>
            <option value="07">Iyul</option>
            <option value="08">Avgust</option>
            <option value="09">Sentabr</option>
            <option value="10">Oktabr</option>
            <option value="11">Noyabr</option>
            <option value="12">Dekabr</option>
          </select>
        </div>

        <div className="pac_main">
          {paketData &&
            paketData.map((item, index) => (
              <div
                key={index}
                className={`pac_main_box ${
                  item.type_paket == "VIP" ? "active" : ""
                }`}
              >
                <div className="pac_main_text">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={
                        item.type_paket == "VIP"
                          ? "/img/cal_gold.png"
                          : `/img/icon_cal.png`
                      }
                      alt=""
                    />
                    <div className="pac_main_h">{item.date_go}</div>
                  </div>
                </div>
                <div className="pac_main_text">
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="pac_main_type">
                      {item.type_paket} - {item.duration} kun
                    </div>
                    <div className="pac_main_p">
                      {item.get_count}/{item.quantity}
                    </div>
                  </div>
                </div>
                <Link to={`/vpaket/${item.id}`} className="pac_main_btn">
                  <div className="pac_btn_h">{item.name} </div>
                  <div className="pac_btn_p">{item.price} $</div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default VisaPacket;
