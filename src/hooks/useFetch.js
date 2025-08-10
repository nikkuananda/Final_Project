import { useEffect } from "react";

export default function useFetch(action, deps = []) {
  useEffect(() => {
    action();
  }, deps); // deps biasanya [dispatch]
}
