import { Bill, Filter, Category } from "../types";
import { useState, useEffect } from "react";

export default function useFilteredBill(
  bills: Bill[],
  categories: Map<String, Category>,
  filter: Filter
) {
  const [filteredBills, setfilteredBills] = useState(bills);

  useEffect(() => {
    console.log("Change filtered bills.");

    setfilteredBills(
      bills.filter((bill) => {
        const billTime = bill.time.toLocaleDateString().split("/");
        if (
          filter.time &&
          filter.time.split("/").some((num, index) => num !== billTime[index])
        )
          return false;

        if (
          filter.category &&
          !bill.category.startsWith(categories.get(filter.category)?.name || "")
        )
          return false;

        if (filter.type && bill.type !== parseInt(filter.type || ""))
          return false;

        return true;
      })
    );
  }, [bills, filter, categories]);

  return filteredBills;
}
