import React from "react";
import { t, jt } from 'ttag';

export default function Instructions() {

  function renderInstructionContent(words:any) {
    return (
      <div className="resourceAnswerText">
      {words}
      </div>
    )
  }

  return (
    <div >
      <div className="pb4 text-align-center" style={{"textAlign":"center"}}> <h2> {t`How to use this tool`} </h2> </div>
      <div className="pv3"><strong>{t`STEP 1`}</strong></div>
      {renderInstructionContent(t`For each person you live with, answer questions about their symptoms.`)}
      <img  src={process.env.PUBLIC_URL + "/step1.svg"} />
      <hr/>
      <div className="pv3"><strong>{t`STEP 2`}</strong></div>
      {renderInstructionContent(t`After inputting your answers, you’ll receive recommendations on what each person should do to stay safe based on official CDC guidelines.`)}
      <img  src={process.env.PUBLIC_URL + "/step2.svg"} />
      <div className="pb2"/>
      <hr/>
      <div className="pv3"><strong>{t`STEP 3`}</strong></div>
      {renderInstructionContent(t`Tap on a recommendation to learn more about the safety behind it.`)}
      <img  src={process.env.PUBLIC_URL + "/step3.svg"} />
      <hr/>
    </div>
  )
}
