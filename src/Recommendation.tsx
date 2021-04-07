import React from "react";
import GridView from "./GridView";
import { InHouseExposure, PersonData } from "./types";
import { State } from "@hookstate/core/dist";
import { Link } from "react-router-dom";
import Household from "./Household";
import Definitions from "./Definitions";
import Footer from "./Footer";
import Resources from "./Resources";
import { t, jt } from 'ttag';

interface Props {
  addNewPerson: () => void;
  membersState: State<PersonData[]>;
  inHouseExposureEventsState: State<InHouseExposure[]>;
  editingHouseholdState: State<boolean>;
  height: State<number>;
  language: string;
  setLanguage: Function;
}

export default function Recommendation(props: Props) {
  const members = props.membersState.get();


  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <header>
        <div className="navbar">
          <div
            className="container d-flex justify-content-between"
            style={{
              fontFamily: "Arial",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "14px",
              lineHeight: "160%",
              textAlign: "center",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "#1F252F"
            }}
          >
            <Link to="/" className="d-flex align-items-center home-link">{t`COVID CALCULATOR`}</Link>
            <button className="language-button" onClick={()=> props.setLanguage(props.language==="en" ? "es" : "en")}>
              <div>{(props.language==="en" ? "GARBLE" : "ENGLISH")}</div>
            </button>
          </div>
        </div>
      </header>
      <main className={"main"} role={"main"} style={{ paddingBottom: "250px" }}>
        <section className={"jumbotron"} style={{ background: "#FFFFFF" }}>
          <Household
            addNewPerson={props.addNewPerson}
            editingHouseholdState={props.editingHouseholdState}
            height={props.height}
            inHouseExposureEventsState={props.inHouseExposureEventsState}
            membersState={props.membersState}
          />
        </section>
        <div
          className="container pb-5"
          style={{
            display: "flex",
            justifyContent: "center",
            background: "#F8F8F8",
            paddingTop: "91px",
            maxWidth: "100%"
          }}
        >
          <div
            style={{
              width: "60%",
              textAlign: "center"
            }}
          >
            {!props.editingHouseholdState.get() && <Resources/>}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
