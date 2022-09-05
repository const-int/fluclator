/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "../node_modules/bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import ClearButton from "./components/ClearButton";
import SelectCalcButton from "./components/SelectCalcButton";
import Header from "./components/Header";
import useInputValue from "./hooks/useInputValue";
import SignControl from "./components/SignControl";

function App() {
  const FIELDS = {
    source: "target",
    target: "source",
    percent: "percent",
  };
  const [source, setSource, nonEmptySource] = useInputValue();
  const [target, setTarget, nonEmptyTarget] = useInputValue();
  const [percent, setPercent, nonEmptyPercent] = useInputValue();
  const [calcField, setCalcField] = useState(FIELDS.target);
  const [isPositivePercent, setIsPositivePercent] = useState(true);
  const [toggleCalculate, setToggleCalculate] = useState(0);
  const sourceRef = useRef();
  const targetRef = useRef();
  const percentRef = useRef();

  function format(val) {
    val = val + "";
    const hasPoint = val.includes(".");
    const [integer, decimals] = val.split(".");
    const cleanInteger = parseFloat(
      integer.replace(/[^0-9$]/g, "").substring(0, 15)
    );
    const cleanDecimal = decimals
      ? decimals.replace(/[^0-9$]/g, "").substring(0, 2)
      : "";
    const formatSettings = {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    };

    if (isNaN(cleanInteger)) {
      return "";
    }

    const formattedIntegerPart = cleanInteger
      .toLocaleString("en-US", formatSettings)
      .replace("$", "");

    if (!hasPoint) {
      return formattedIntegerPart;
    }

    return formattedIntegerPart + "." + cleanDecimal;
  }

  function handlePercentInput(value) {
    const intVal = parseFloat(value);

    if (intVal > 100 && !isPositivePercent) {
      setPercent("100");
      return;
    }

    setPercent(format(value));
  }

  useEffect(() => {
    const sourceVal = parseFloat(source.replace(/[^0-9$.]/g, "") || 0);
    const targetVal = parseFloat(target.replace(/[^0-9$.]/g, "") || 0);
    const percentVal = parseFloat(percent.replace(/[^0-9$.]/g, "") || 0);
    const percentSign = isPositivePercent ? 1 : -1;

    if (calcField === FIELDS.target) {
      if (source === "" || percent === "") {
        return;
      }

      if (!isPositivePercent && percentVal >= 100) {
        setTarget(format(0));
        setPercent(format(100));
        return;
      }

      const nextTargetVal = sourceVal * (1 + (percentSign * percentVal) / 100);
      setTarget(format(nextTargetVal));
      setIsPositivePercent(nextTargetVal > sourceVal);
    }

    if (calcField === FIELDS.source) {
      if (target === "" || percent === "") {
        return;
      }

      if (!isPositivePercent && percentVal >= 100) {
        setSource(format(targetVal));
        setPercent(format(100));
        return;
      }

      const nextSourceVal = targetVal / (1 + (percentSign * percentVal) / 100);
      setSource(format(nextSourceVal));
      setIsPositivePercent(targetVal > nextSourceVal);
    }

    if (calcField === FIELDS.percent) {
      if (source === "" || target === "") {
        return;
      }

      setPercent(format((targetVal / sourceVal - 1) * 100));
      setIsPositivePercent(targetVal > sourceVal);
    }
  }, [source, target, percent, calcField, toggleCalculate]);

  return (
    <>
      <Header />

      <div className="container fields-grid">
        <div className="field source-value">
          <label className="label is-medium">Initial Value</label>
          <div
            className={`input-component ${
              calcField === FIELDS.source ? "is-active" : ""
            } field has-addons`}
          >
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-large"
                onChange={(e) => setSource(format(e.target.value))}
                onBlur={() =>
                  setSource(source === "" ? nonEmptySource : source)
                }
                value={source}
                ref={sourceRef}
                pattern="[0-9]*"
              />

              {calcField !== FIELDS.source && (
                <ClearButton
                  inputValue={source}
                  onClick={() => {
                    setSource("");
                    sourceRef.current.focus();
                  }}
                />
              )}
            </div>
            <SelectCalcButton
              onClick={() => setCalcField(FIELDS.source)}
              isActive={calcField === FIELDS.source}
            />
          </div>
        </div>

        <div className="field percent-value">
          <label className="label is-medium">Difference</label>
          <div
            className={`input-component ${
              calcField === FIELDS.percent ? "is-active" : ""
            } field has-addons`}
          >
            <div className="control is-expanded has-plus-minus">
              <div className="plus-minus">
                <SignControl
                  isPositive={isPositivePercent}
                  onClick={() => {
                    setIsPositivePercent(!isPositivePercent);
                    setTimeout(() => {
                      setToggleCalculate(toggleCalculate + 1);
                    }, 100);
                  }}
                />
              </div>
              <input
                type="text"
                className="input is-large"
                onChange={(e) => handlePercentInput(e.target.value)}
                onBlur={() =>
                  setPercent(percent === "" ? nonEmptyPercent : percent)
                }
                value={percent}
                ref={percentRef}
                pattern="[0-9]*"
              />

              {calcField !== FIELDS.percent && (
                <ClearButton
                  inputValue={percent}
                  onClick={() => {
                    setPercent("");
                    percentRef.current.focus();
                  }}
                />
              )}

              <div className="percent-sign" style={{ left: 0 }}>
                <div className="percent-value-hidden">{percent}</div>%
              </div>
            </div>
            <SelectCalcButton
              onClick={() => setCalcField(FIELDS.percent)}
              isActive={calcField === FIELDS.percent}
            />
          </div>
        </div>

        <div className="field target-value">
          <label className="label is-medium">Changed Value</label>
          <div
            className={`input-component ${
              calcField === FIELDS.target ? "is-active" : ""
            } field has-addons`}
          >
            <div className="control is-expanded">
              <input
                type="text"
                className="input is-large"
                onChange={(e) => setTarget(format(e.target.value))}
                onBlur={() =>
                  setTarget(target === "" ? nonEmptyTarget : target)
                }
                value={target}
                ref={targetRef}
                pattern="[0-9]*"
              />

              {calcField !== FIELDS.target && (
                <ClearButton
                  inputValue={target}
                  onClick={() => {
                    setTarget("");
                    targetRef.current.focus();
                  }}
                />
              )}
            </div>
            <SelectCalcButton
              onClick={() => setCalcField(FIELDS.target)}
              isActive={calcField === FIELDS.target}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
