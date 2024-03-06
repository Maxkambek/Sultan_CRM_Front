import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_PATH } from "../constants/constants";

const FAQ = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(API_PATH + "account/faq/").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="Faq">
      <div className="d-flex justify-content-between align-items-center">
        <div className="faq_header">
          {"Ko'p beriladigan savollarga javoblar"}
        </div>
      </div>
      <div className="faq_main">
        {data?.map((item, index) => (
          <>
            <Accordion key={index} className="my_accor">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography className="my_typo">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="my_typo_2">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </>
        ))}
      </div>

      <div className="faq_head d-flex flex-column justify-content-end align-items-end">
        <div>Texnik nosozliklar uchun:</div>
        <div> 97-716-54-34</div>
        <a target="_blank" href="https://t.me/Mahkam_Kasimov">
          <div>Telegram</div>
        </a>
      </div>
    </div>
  );
};

export default FAQ;
