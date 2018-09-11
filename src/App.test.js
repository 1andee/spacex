import React from "react";
import ReactDOM from "react-dom";
import App, * as AppImport from "./App";

it("renders without crashing", async () => {
  class AppTest extends App {
    static promise;
    componentDidMount(...args) {
      return (AppTest.promise = super.componentDidMount(...args));
    }
  }

  const App0 = App;
  AppImport.default = AppTest;

  const div = document.createElement("div");
  await new Promise((resolve, reject) =>
    ReactDOM.render(<App />, div, resolve)
  );

  // wait for the promise to conclude
  const promise = AppTest.promise;
  expect(promise).toBeInstanceOf(Promise, "Instrumenting App instance failed");
  await promise;

  AppImport.default = App0;
});
