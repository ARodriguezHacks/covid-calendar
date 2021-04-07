import React from "react";
import { t, jt } from 'ttag';
import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@reach/disclosure";
import Definitions from "./Definitions";

export default function Resources() {
  const mapLink = <a href="https://govstatus.egov.com/or-oha-covid-19-testing">{t`OHA’s test finder map`}</a>
  return (


    <div className="container w-60">
      <h2>{t`Resources`}</h2>
      <div className="py-4"/>
      <QuestionBlock question= {t`What is the difference between Quarantine and Isolation?`} answer = {<Definitions/>}/>
      <QuestionBlock question={t`I can't afford to quarantine or isolate`} answer={<div>{t`Help is available! Please call 211 to be connected to COVID-19 specific resources. Community based organizations can help you with food boxes, rent, and utilities. They can also help you get connected to other benefits you are eligible for.`}</div>}/>
      <QuestionBlock question={t`Where do I get a test?`} answer={<div>{jt`You can find one using ${mapLink}.`}</div>}/>

      <QuestionBlock question={t`I have additional questions but no primary care doctor`}
        answer={
          <>
            <p className="pv2">{t`If you are a Clackamas County resident, reach out to a Clackamas County health center. To set up care or learn more about any of our health clinics call 503-655-8471.  `}</p>
            <p className="pv2">{t`If you are not a resident, we recommend checking your local health centers.`}</p>
            <p className="pv2">{t`Clackamas Health Centers offer care on a sliding scale to eligible uninsured and underinsured people. No one is refused care due to an inability to pay. `}</p>
          </>
        }/>
    </div>
  )
}

function QuestionBlock(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <Disclosure open={isOpen} onChange={() => setIsOpen(!isOpen)}>
          <DisclosureButton className="w-100">
          <h4 className="d-flex justify-content-between align-items-center">
            <span className="">
              {props.question}
            </span>

          <span aria-hidden="true" className={"fas " + (isOpen ? "fa-angle-up" : "fa-angle-down")}></span>
          </h4>
          </DisclosureButton>
          <DisclosurePanel>
          <div className="mv3 resourceAnswerText">
          {props.answer}
          </div>
          </DisclosurePanel>
        <hr/>
        </Disclosure>
      </div>
    )
}

interface Props {
  question: string;
  answer: JSX.Element;
}
