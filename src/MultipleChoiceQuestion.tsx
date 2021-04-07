import React, { useState } from "react";
import { parse, format } from "date-fns";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from "@reach/disclosure";

interface Props {
  id: number;
  questionText: string;
  checked: boolean;
  onChange: (e: React.BaseSyntheticEvent) => void;
  tooltip?: JSX.Element;
  disabled?: boolean;
}

export default function MultipleChoiceQuestion(props: Props) {
  return (
    <div className="custom-control custom-checkbox mv4">
      <input
        className="custom-control-input"
        checked={props.checked}
        id={`checkbox-${props.id}-${props.questionText}`}
        type="checkbox"
        onChange={props.onChange}
        disabled={props.disabled}
      />
      <Disclosure>
        <label
          className="custom-control-label w-100"
          htmlFor={`checkbox-${props.id}-${props.questionText}`}
        >
          <div className="questionnaire-text d-flex justify-content-between align-items-start" >

            {props.questionText}
            {props.tooltip && (
              <DisclosureButton style={{flexShrink: 0}}>
                <img
                  src={process.env.PUBLIC_URL + "/circle-question.svg"}
                  style={{ marginLeft: "0.2rem" }}
                />
              </DisclosureButton>
            )}
          </div>
        </label>
        {props.tooltip && (
          <DisclosurePanel>
            <div className="our-tooltip">{props.tooltip}</div>
          </DisclosurePanel>
        )}
      </Disclosure>
    </div>
  );
}
