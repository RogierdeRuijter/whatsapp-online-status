import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import Milestones from "./Milestones.svelte";
import {
  signedStore,
  genericErrorStore,
  alreadySignedErrorStore,
} from "./store.js";

beforeEach(() => {
  signedStore.set(false);
  genericErrorStore.set(false);
  alreadySignedErrorStore.set(false);
});

test.only("should display a progress bar and milestone 1", () => {
  render(Milestones);

  expect(screen.getByText("Milestone"));
  expect(screen.getByText("1"));
});
