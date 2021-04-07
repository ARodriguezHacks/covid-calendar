import React from "react";
import { t, jt } from 'ttag';

export default function Definitions() {

  const strongQuarantine = <strong className="our-blue">{t`quarantine`}</strong>
  const strongIsolate = <strong className="our-blue">{t`isolate`}</strong>
  return (
        <div className="f4" >
            <div className="row"
              style={{
                marginTop: "80px",
                marginBottom: "60px",
                textAlign: "left"
              }}
            >
              <div className="col-md-9 text-align-left pt3" >
                {jt`People who must ${strongQuarantine} should avoid physical contact
                with everyone outside their home. This includes work, groceries, and socializing.`}
              </div>
              <div className="col-md-3">
                <img  src={process.env.PUBLIC_URL + "/quarantine.svg"} />
              </div>
            </div>
            <hr/>
            <div className="row"
              style={{
                marginTop: "80px",
                marginBottom: "60px",
                textAlign: "left"
              }}
            >
              <div className="col-md-9 text-align-left pt3" >
                {jt`People who must ${strongIsolate} should keep away from
                everyone inside and outside the home.`}
              </div>
              <div className="col-md-3">
               <img src={process.env.PUBLIC_URL + "/isolation.svg"} />
             </div>
          </div>
        </div>
  )
}
