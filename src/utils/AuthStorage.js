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
  get id() {
    return this.value && this.value.user && this.value.user.id;
  }
  get fullname() {
    return this.value && this.value.user && this.value.user.fullname;
  }
}

export default new AuthStorage("AUTH");
