import Storage from "./Storage";

class AuthStorage extends Storage {
  get isLogin() {
    return !!this.value && !!this.value.token;
  }

  get token() {
    return this.value && this.value.token;
  }

  get user() {
    return this.value && this.value.user;
  }
}

export default new AuthStorage("AUTH");
