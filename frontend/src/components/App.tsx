import React, { useReducer, useRef } from "react";
import "../App.css";
import BillSheet from "./BillSheet";
import useBills from "../hooks/useBills";
import useFilteredBill from "../hooks/useFilteredBills";
import useSummary from "../hooks/useSummary";
import reducer from "../reducers";
import ErrorBoundary from "./ErrorBoundary";
import CanvasChart from "./CanvasChart";
import useRandomThemeColor from "../hooks/useRandomThemeColor";
import { Action } from "../types";

const initialState = {
  filter: {},
  form: {
    show: false,
  },
};

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {}
);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const counter = useRef(0);
  const { bills, setBills, categories } = useBills(counter);
  const filteredBills = useFilteredBill(bills, categories, state.filter);
  const summary = useSummary(filteredBills);

  const randomThemeColor = useRandomThemeColor();

  return (
    <div id="App" style={randomThemeColor}>
      <ErrorBoundary>
        <CanvasChart
          id="summary-chart"
          title={`账单分类统计 - 总收入：￥${summary.income}，总支出：￥${summary.expenditure}`}
          type={"pie"}
          labels={Array.from(summary.byCategories.keys())}
          data={Array.from(summary.byCategories.values())}
        />
      </ErrorBoundary>

      <DispatchContext.Provider value={dispatch}>
        <BillSheet
          bills={filteredBills}
          setBills={setBills}
          counter={counter}
          categories={categories}
          filter={state.filter}
          form={state.form}
        />
      </DispatchContext.Provider>
    </div>
  );
}

export default App;
