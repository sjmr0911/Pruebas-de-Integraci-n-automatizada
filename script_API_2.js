import http from "k6/http";
import { check } from "k6";

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
};

export default function () {
  const res = http.post(baseUrl, JSON.stringify(postData), options);

  check(res, {
    "status is 201": (r) => r.status === 201,
    "response matches input data": (r) => {
      const responseBody = r.json();
      return (
        responseBody.title === postData.title &&
        responseBody.body === postData.body &&
        responseBody.userId === postData.userId
      );
    },
  });
}

