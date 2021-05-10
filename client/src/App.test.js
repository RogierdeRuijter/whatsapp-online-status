import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import App from "./App.svelte";
import {
  signedStore,
  genericErrorStore,
  alreadySignedErrorStore,
} from "./store.js";
// import WS from "jest-websocket-mock";

beforeEach(() => {
  signedStore.set(false);
  genericErrorStore.set(false);
  alreadySignedErrorStore.set(false);
});

test("should display the description of the petition", () => {
  render(App);

  expect(
    screen.getByText(
      "This is a petition for creating an option within whatsapp to remove the online status"
    )
  ).toBeInTheDocument();
});

// test.only("should display the total amount of votes", async () => {
//   const server = new WS("ws://localhost:8080");
//   render(App);
//   await server.connected;

//   expect(
//     screen.getByText(
//       "This is a petition for creating an option within whatsapp to remove the online status"
//     )
//   ).toBeInTheDocument();
// });

test("should display a congrats message if the sign was succesful", async () => {
  render(App);

  // TODO: figure out if this actually waits 10 miliseconds or it is just passed
  fetch.mockResponseOnce(
    new Promise((resolve) => setTimeout(() => resolve({}), 10))
  );
  const button = screen.getByRole("button", { name: "Sign" });
  userEvent.click(button);
  // TODO: add back in when things are normal again
  // expect(button).toBeDisabled();

  expect(
    await screen.findByText("Thanks for signing the petition!")
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "This is a petition for creating an option within whatsapp to remove the online status"
    )
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      "You are currently not able to sign the petition, because an error occured."
    )
  ).not.toBeInTheDocument();
  expect(button).toBeDisabled();
});

// test("should display an error message to the user if the api returns an error", async () => {
//   render(App);

//   fetch.mockResponseOnce(JSON.stringify("fail"), { status: 400 });
//   const button = screen.getByText("Sign");
//   await userEvent.click(button);
//   expect(button).toBeDisabled();

//   expect(
//     await screen.findByText(
//       "You are currently not able to sign the petition, because an error occured."
//     )
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(
//       "This is a petition for creating an option within whatsapp to remove the online status"
//     )
//   ).toBeInTheDocument();
//   expect(screen.getByText("Retry")).toBeInTheDocument();
//   expect(screen.queryByText("Sign")).not.toBeInTheDocument();
// });

// test("should display an already signed error message if the user already signed the petition", async () => {
//   render(App);

//   fetch.mockResponseOnce(JSON.stringify("fail"), { status: 403 });
//   const button = screen.getByText("Sign");
//   await userEvent.click(button);
//   expect(button).toBeDisabled();

//   expect(
//     await screen.findByText(
//       "You have already signed the petition, you can't sign it again, you sneaky bastard :)"
//     )
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(
//       "This is a petition for creating an option within whatsapp to remove the online status"
//     )
//   ).toBeInTheDocument();
//   expect(screen.getByText("Sign")).toBeInTheDocument();
//   expect(button).toBeDisabled();
// });

// test("should display the congrats message when retry button is clicked", async () => {
//   render(App);

//   fetch.mockResponseOnce(JSON.stringify("fail"), { status: 400 });
//   const button = screen.getByText("Sign");
//   await userEvent.click(button);
//   expect(button).toBeDisabled();

//   expect(
//     await screen.findByText(
//       "You are currently not able to sign the petition, because an error occured."
//     )
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(
//       "This is a petition for creating an option within whatsapp to remove the online status"
//     )
//   ).toBeInTheDocument();

//   const retryButton = screen.getByText("Retry");
//   expect(retryButton).toBeInTheDocument();
//   expect(screen.queryByText("Sign")).not.toBeInTheDocument();

//   fetch.mockResponseOnce(
//     new Promise((resolve) => setTimeout(() => resolve({}), 10))
//   );
//   await userEvent.click(retryButton);
//   expect(retryButton).toBeDisabled();
//   expect(
//     screen.queryByText(
//       "You are currently not able to sign the petition, because an error occured."
//     )
//   ).not.toBeInTheDocument();

//   expect(
//     await screen.findByText("Thanks for signing the petition!")
//   ).toBeInTheDocument();
//   expect(
//     screen.getByText(
//       "This is a petition for creating an option within whatsapp to remove the online status"
//     )
//   ).toBeInTheDocument();
//   expect(
//     screen.queryByText(
//       "You are currently not able to sign the petition, because an error occured."
//     )
//   ).not.toBeInTheDocument();
//   expect(screen.getByText("Retry")).toBeInTheDocument();
//   expect(retryButton).toBeDisabled();
// });
