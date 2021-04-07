import React, { useRef } from "react";
import { InHouseExposure, PersonData } from "./types";
import Person from "./Person";
import { State } from "@hookstate/core";
import { computeHouseHoldQuarantinePeriod } from "./calculator";
import { Link } from "react-router-dom";
import { downloadEvents } from "./calendar";
import { t, jt } from 'ttag';

interface Props {
  addNewPerson: () => void;
  membersState: State<PersonData[]>;
  inHouseExposureEventsState: State<InHouseExposure[]>;
  editingHouseholdState: State<boolean>;
  height: State<number>;
}

export default function Household(props: Props) {
  const editingHousehold = props.editingHouseholdState.get();
  const members = props.membersState.get();
  const inHouseExposureEvents = props.inHouseExposureEventsState.get();
  const guidances = computeHouseHoldQuarantinePeriod(
    members,
    inHouseExposureEvents
  );

  const editingPersonRef = useRef<HTMLDivElement>(null);

  function addPerson(e: React.BaseSyntheticEvent) {
    e.stopPropagation();
    props.editingHouseholdState.set(true);
    props.addNewPerson();
  }


  function renderTitle() {
    if (editingHousehold) {
      return (
        <>
          <h2
            style={{
              fontFamily: "Helvetica",
              fontSize: "48px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "56px",
              letterSpacing: "-0.01em",
              textAlign: "left"
            }}
          >
            {t`Tell us about yourself and each person you live with.`}
          </h2>
          <p
            className="lead pv3"
            style={{
              fontFamily: "Helvetica",
              fontSize: "24px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "36px",
              letterSpacing: "0em",
              textAlign: "left",
              color: "#000000"
            }}
          >
            {t`Thank you for doing your part to keep our community safe! For help
            with a question, tap`}
            <img
              src={process.env.PUBLIC_URL + "/circle-question.svg"}
              style={{ marginLeft: "0.4rem" }}
            />
          </p>
        </>
      );
    } else {
      const healthCentersLink = <a href="https://www.clackamas.us/healthcenters">
              {t`Clackamas County health center`}
            </a>;
      return (
        <>
          <h1>{t`Here’s what to do based on the latest CDC guidelines.`}</h1>
          <p className="lead text-muted">
            {jt`If you have further questions, please contact your doctor or a ${healthCentersLink}.`}
          </p>
        </>
      );
    }
  }

  function renderAction() {
    if (members.length) {
      if (editingHousehold) {
        return (
          <div className="">
          <button
            className="white get-recommendation-button"
            onClick={(e: React.BaseSyntheticEvent) => {
              props.editingHouseholdState.set(false);
              window.scrollTo(0,0);
            }}
          >
            {t`Done`}{" "}
          </button>
          </div>
        );
      } else {
        return (
          <div className="d-flex justify-content-center">
            <button
              className="my-3 update-button"
              onClick={() => {
                props.editingHouseholdState.set(true);
              }}
            >
              {t`EDIT ANSWERS`}
            </button>

          </div>

        );
      }
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        <div
          className={"col-md-12"}
          style={{
            backgroundColor: "#fff",
            //minHeight: props.height.get() + "px" TODO:this is to manage the footer placement but has been messed up by other changes and so we're disabling it
          }}
        >
          <div className={"container"}>
            <div className={"my-3"} />
            {renderTitle()}
            <div>
              {props.membersState.map((personState: State<PersonData>, index: number) => {
                const person = personState.get();
                const id = person.id;
                const personGuidance = guidances.find(c => c.person.id === id);
                if (personGuidance) {
                  return (
                    <Person
                      key={id}
                      personState={personState}
                      membersState={props.membersState}
                      inHouseExposureEventsState={
                        props.inHouseExposureEventsState
                      }
                      editingHouseholdState={props.editingHouseholdState}
                      guidance={personGuidance}
                      editingPersonRef={editingPersonRef}
                      addNewPerson={props.addNewPerson}
                      recommendationDetailOpenByDefault={index===0}
                    />
                  );
                }
              })}
            </div>
            {editingHousehold && (
              <button className="mb-2 add-another-person-button" onClick={addPerson}>
                <div style={{display: "flex"}}>
                <div style={{width:"44px"}}> {/*hold the space open for no image load-time jump.*/}
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="21" stroke-width="2"/>
                  <path d="M22 14V22M22 30V22M22 22H14M22 22H30" stroke-width="2"/>
                </svg>

                </div>
                <span className={"add-another-person-text"}>
                  {t`Add another person`} &nbsp;
                </span>
                </div>
              </button>
            )}
            {renderAction()}
          </div>
        </div>
      </div>
    </>
  );
}
