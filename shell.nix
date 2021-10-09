with import <nixpkgs> {};

mkShell {
  name = "browser-extension-template-shell";
  buildInputs = [
    nodejs-16_x
    zip
    yarn
  ];
}
