import { allCountry } from "../types/Country";
import update from "immutability-helper";

export interface actionType {
  type: string;
  payload?: any;
}

export default function appReducer(state: any, action: actionType) {
  switch (action.type) {
    case "GET_ALL_COUNTRY":
      var data = action.payload;
      var newData = data.map((item: allCountry) =>
        Object.assign(item, { clicks: false })
      );
      return {
        ...state,
        country: newData,
      };

    case "GET_FLAG_CIOC":
      return {
        ...state,
        country_cioc: action.payload,
      };
    case "GET_COUNTRY":
      return {
        ...state,
        country_flag: action.payload,
      };
    case "UPDATE_COUNTRY":
      const name = action.payload;

      var data = state.country;
      var commentIndex = data.findIndex(function (c: any) {
        return c.name == name;
      });

      var updatedComment = update(data[commentIndex], {
        clicks: { $set: true },
      });
      var newData = update(data, {
        $splice: [[commentIndex, 1, updatedComment]],
      });
      const updatedCountry = newData.sort((x: any) => (x.clicks ? -1 : 1));
      return {
        ...state,
        country: updatedCountry,
      };
    default:
      return state;
  }
}
