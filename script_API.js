import http from "k6/http";
import { sleep, group } from "k6";

export const options = {
  vus: 100,
  duration: "60s",
};

export default function () {
  group("stress-test", function () {
    http.get("https://jsonplaceholder.typicode.com/posts");
  });
  sleep(1);
}

