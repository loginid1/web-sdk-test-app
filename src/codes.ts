class Codes {
  private readonly codeElement = document.getElementById("code");

  public addCode(code: string) {
    this.codeElement.textContent = code;
  }

  public removeCode() {
    this.codeElement.textContent = "";
  }
}

export default Codes;
