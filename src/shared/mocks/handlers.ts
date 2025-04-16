import { http, HttpResponse } from "msw";

const USER_EMAIL = "test@gmail.com";
const USER_PASSWORD = "1234";

interface LoginRequest {
  email: string;
  password: string;
}

export const handlers = [
  http.get("/", () => {
    return HttpResponse.json({
      text: "Hello, React!",
    });
  }),
  http.get("/auth/login", () => {
    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      email: USER_EMAIL,
      password: USER_PASSWORD,
    });
  }),
  http.post("/auth/login", async ({ request }) => {
    const { email, password }: LoginRequest =
      (await request.json()) as LoginRequest;

    if (email === USER_EMAIL && password === USER_PASSWORD) {
      return HttpResponse.json(
        {
          accessToken: "mocked-jwt-token",
          user: { email },
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        message: "Неверный email или password",
      },
      { status: 401 }
    );
  }),
];
