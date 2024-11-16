import fetchApi from "../services/fetch.service";
import {useCallback} from "react";

const useFetch = () => {
  return useCallback(fetchApi, []);
};

export default useFetch;
