import { cookiesService } from "helpers/cookiesService";

export function authHeader() {
  let user = cookiesService.getCookies("user");

  if (user) {
    return `Bearer ${user.jwtToken}`;
  } else {
    return {};
  }
}