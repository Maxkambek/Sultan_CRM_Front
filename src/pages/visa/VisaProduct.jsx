import axios from "axios";
import { useEffect, useState } from "react";
import {} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_PATH, CONFIG, IMAGE_CONFIG } from "../../constants/constants";
import { toast } from "react-toastify";

const VisaProduct = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [paketData, setPaketData] = useState([]);
  const [data, setData] = useState([]);
  const [mod3, setMod3] = useState(false);
  const [currentClient, setCurrentClient] = useState();
  const [visa, setVisa] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    axios.get(API_PATH + `main/paket-update/${id}/`, CONFIG).then((res) => {
      setPaketData(res.data);
    });
    axios
      .get(
        API_PATH + `main/client-list?paket_id=${id}&search=${search}`,
        IMAGE_CONFIG
      )
      .then((res) => {
        setData(res.data);
      });
  }, [search, id]);

  const clientGetID = (pk) => {
    axios.get(API_PATH + `main/client-update/${pk}/`, CONFIG).then((res) => {
      setCurrentClient(res.data);
      console.log(res.data);
      setMod3(!mod3);
    });
  };

  const sendVisa = (link_file, item_id) => {
    axios
      .patch(
        API_PATH + `main/client-update/${item_id}/`,
        {
          status: "SendVisa",
        },
        CONFIG
      )
      .then(() => {
        toast("O'zgartirildi");
        document.location.reload();
      });
  };
  const fdata = new FormData();

  const updateClient = (pk) => {
    fdata.append("visa_file", visa);
    fdata.append("status", "Ready");
    axios
      .patch(API_PATH + `main/client-update/${pk}/`, fdata, IMAGE_CONFIG)
      .then(() => {
        setMod3(!mod3);
        document.location.reload();
      });
  };

  return (
    <>
      <div className="Product">
        <div className="prod_name_box">
          <div className="prod_name_box_1">
            <div className="prod_name_1_text">
              <div className="prod_name_1_1">{paketData?.name}</div>
              <div className="prod_name_1_2">{paketData?.price} $</div>
            </div>
            <div className="prod_name_1_btn">
              {data?.length}/{paketData?.quantity}
            </div>
          </div>
          <div className="prod_name_2">
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Ketish</div>
                <div className="prod_name_2_text_p">{paketData?.date_go}</div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Qaytish</div>
                <div className="prod_name_2_text_p">{paketData?.date_back}</div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Yo’nalish</div>
                <div className="prod_name_2_text_p">{paketData?.reys}</div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Madina Davomiyligi</div>
                <div className="prod_name_2_text_p">
                  {paketData?.madina_duration}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Madina Hotel</div>
                <div className="prod_name_2_text_p">
                  {paketData?.madina_hotel}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Madina ovqatlanish</div>
                <div className="prod_name_2_text_p">
                  {paketData?.madina_dish}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Makka davomiyligi </div>
                <div className="prod_name_2_text_p">
                  {paketData?.makka_duration}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Makka Hotel</div>
                <div className="prod_name_2_text_p">
                  {paketData?.makka_hotel}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">Makka ovqatlanish</div>
                <div className="prod_name_2_text_p">
                  {paketData?.makka_dish}
                </div>
              </div>
            </div>
            <div className="prod_name_2_main w-100">
              <img src="/img/icon_correct.png" alt="" />
              <div className="prod_name_2_text">
                <div className="prod_name_2_text_h">
                  {"Qo'shimcha ma'lumotlari"}
                </div>
                <div className="prod_name_2_text_p w-100">
                  {paketData?.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="prod_main">
          <div className="dash_name_box">
            <div className="dash_name">Ziyoratchilar ro’yhati</div>
            <div className="d-flex gap-3 align-items-center">
              {/* <div className="my_select">
                <select className="dash_sel" name="" id="">
                  <option value="">Filiallar</option>
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

              <div className="">
                <div
                  onClick={() => {
                    data?.length > 1
                      ? nav(`/can/${id}`)
                      : toast("Oldin mijoz kiritilishi kerak!");
                  }}
                  className="prod_btn"
                >
                  {"Joylashtirish"}
                </div>
              </div>
            </div>
          </div>
          <div className="prod_text">
            <div className="prod_text_h prod_text_h1">#</div>
            <div className="prod_text_h prod_text_h2">F.I.O</div>
            <div className="prod_text_h prod_text_h3">Pass Num</div>
            <div className="prod_text_h prod_text_h10">Pass Muddati</div>
            <div className="prod_text_h prod_text_h4">To’lov</div>
            <div className="prod_text_h prod_text_h6">Pass File</div>
            <div className="prod_text_h prod_text_h7">Visa</div>
            <div className="prod_text_h prod_text_h8">Filiall</div>
            <div className="prod_text_h prod_text_h9">Joylashuv</div>
            <div className="prod_text_h prod_text_h5">Status</div>
            <div className="prod_text_h prod_text_h11 text-center">
              Visaga {"Jo'natish"}
            </div>
          </div>

          {data?.map((item, index) => (
            <div key={index} className="prod_text2">
              <div className="prod_text_p prod_text_h1">{index + 1}</div>
              <div
                onClick={() => clientGetID(item.id)}
                className="prod_text_p prod_text_h2 cursor"
              >
                {item.full_name}
              </div>
              <div className="prod_text_p prod_text_h3">
                {item.passport_seria}
              </div>
              <div className="prod_text_p prod_text_h10">
                {item.passport_expire}
              </div>
              <div className="prod_text_p prod_text_h4">
                $ {item.payment_taken}
              </div>
              <div className="prod_text_p prod_text_h6">
                <a target="_blank" href={item.passport_file}>
                  <span>PassFile</span>
                </a>
              </div>
              <div className="prod_text_p prod_text_h7">
                {item.visa_file ? (
                  <>
                    <a target="_blank" href={item.visa_file}>
                      {" "}
                      <span>VisaFile</span>
                    </a>
                  </>
                ) : (
                  <>
                    <span>VisaFile</span>
                  </>
                )}
              </div>
              <div className="prod_text_p prod_text_h8">{item.branch_name}</div>
              <div className="prod_text_p prod_text_h9">{item.stay}</div>
              <div className="prod_text_p prod_text_h5">{item.status}</div>
              <div
                onClick={() =>
                  item.status === "New"
                    ? sendVisa(item.passport_file, item.id)
                    : ""
                }
                className="prod_text_p prod_text_h11"
              >
                <div className="prod_text_btn">
                  <img src="/img/sent.png" alt="" />
                  Send
                </div>
              </div>
            </div>
          ))}
        </div>

        {mod3 ? (
          <>
            <div className={`modalcha`}>
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="mod_text">
                  <div className="mod_name">
                    <div className="mod_name_h">{currentClient?.full_name}</div>
                    <img
                      onClick={() => setMod3(!mod3)}
                      className={``}
                      src="/img/icon_x.png"
                      alt=""
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">F.I.O </div>
                    <input
                      value={currentClient?.full_name}
                      disabled
                      className="mod_text_inp"
                      type="text"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Passport Seria</div>
                    <input
                      disabled
                      value={currentClient?.passport_seria}
                      className="mod_text_inp"
                      type="text"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Passport berilgan vaqti</div>
                    <input
                      value={currentClient?.passport_date}
                      disabled
                      className="mod_text_inp"
                      type="date"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">
                      Passport amal qilish muddati
                    </div>
                    <input
                      value={currentClient?.passport_expire}
                      disabled
                      className="mod_text_inp"
                      type="date"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h"> Telefon Raqami</div>
                    <input
                      className="mod_text_inp"
                      type="text"
                      value={currentClient?.phone}
                      disabled
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Kelishilgan Narx</div>
                    <input
                      disabled
                      value={currentClient?.price}
                      className="mod_text_inp"
                      type="number"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Oldindan to’lov</div>
                    <input
                      // onChange={(e) => setUpdatedPrice(e.target.value)}
                      disabled
                      defaultValue={currentClient?.payment_taken}
                      className="mod_text_inp"
                      type="number"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Qolgan {"To'lov"}</div>
                    <input
                      disabled
                      className="mod_text_inp"
                      type="number"
                      value={
                        currentClient?.price - currentClient?.payment_taken
                      }
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Joylashuv</div>
                    <input
                      value={currentClient?.stay}
                      disabled
                      className="mod_text_inp"
                      type="text"
                    />
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Passport File</div>

                    <label className="input-file ">
                      <input
                        disabled
                        type="file"
                        name="upload"
                        accept="application/pdf"
                        id="passport"
                      />
                      <a target="_blank" href={currentClient?.passport_file}>
                        <span>File Link</span>
                      </a>
                    </label>
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Visa File</div>

                    <label className="input-file ">
                      <input
                        disabled
                        type="file"
                        name="upload"
                        accept="application/pdf"
                        id="passport"
                      />
                      {currentClient?.visa_file || visa ? (
                        <>
                          <div className="d-flex align-item-center justify-content-between">
                            <div>
                              <a
                                target="_blank"
                                href={
                                  currentClient?.visa_file
                                    ? currentClient.visa_file
                                    : URL.createObjectURL(visa)
                                }
                              >
                                <span>File Link</span>
                              </a>
                            </div>

                            <div>
                              <label className="input-file ">
                                <input
                                  required
                                  type="file"
                                  onChange={(e) => setVisa(e.target.files[0])}
                                  name="pass_file"
                                  id="passport"
                                />
                                <span>File Change</span>
                              </label>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <label className="input-file ">
                            <input
                              required
                              type="file"
                              onChange={(e) => setVisa(e.target.files[0])}
                              name="pass_file"
                              id="passport"
                            />
                            <span>File Upload</span>
                          </label>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="mod_text_box">
                    <div className="mod_text_h">Hudud</div>
                    <input
                      disabled
                      value={currentClient?.country}
                      className="mod_text_inp"
                      type="text"
                    />
                  </div>

                  <div className="mod_text_box">
                    <div className="mod_text_h">{"Qo'shimcha ma'lumotlar"}</div>
                    <textarea
                      defaultValue={
                        currentClient?.description
                          ? currentClient?.description
                          : ""
                      }
                      disabled
                      // onChange={(e) => setUpdatedDescription(e.target.value)}
                      className="mod_textarea"
                      type="text"
                    />
                  </div>
                  <div className="mod_text_box mb-5">
                    <div className="mod_text_h">Filiall</div>
                    <input
                      value={currentClient?.branch_name}
                      className="mod_text_inp"
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="mod_btn mt-3 mb-2">
                  <button
                    onClick={() => updateClient(currentClient.id)}
                    type="submit"
                  >
                    Davom etish
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default VisaProduct;
