import http from "k6/http";
import { sleep, group } from "k6";
import { check } from "k6";

export const options = {
  vus: 100,
  duration: "60s",
  thresholds: {
    http_req_duration: ["p(95)<200"],
    http_req_failed: ["rate<0.1"],  
  },
};

function getPosts() {
  group("get-posts", function () {
    const response = http.get("https://jsonplaceholder.typicode.com/posts");
    if (response.status !== 200) {
      console.warn(`GET request failed with status code ${response.status}`);
    }

    check(response, {
      "is status 200": (r) => r.status === 200,
    });
  });

  sleep(Math.random() * 2);
}

function createPost() {
  const baseUrl = "https://jsonplaceholder.typicode.com/posts";

  const postData = {
    title: "Título de prueba",
    body: "Cuerpo de la publicación de prueba",
    userId: 1,
  };

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData), 
  };

  group("create-post", function () {
    const res = http.post(baseUrl, options);

    if (res.status !== 201) {
      console.warn(`POST request failed with status code ${res.status}`);
    } else {
      check(res, {
        "is status 201": (r) => r.status === 201,
        "response body matches postData": (r) => JSON.stringify(r.json()) === JSON.stringify(postData),
      });
    }
  });
}

export default function () {
  getPosts();
  createPost();
}
