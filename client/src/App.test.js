import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'

import App from './App.svelte'

test('should show the description of the petition', () => {
  render(App);

  expect(screen.getByText('This is a petition for creating an option within whatsapp to remove the online status')).toBeInTheDocument()
});

test('should display a congrats message if the sign was succesful', async () => {
  fetch.mockResponseOnce({})

  render(App);

  const button = screen.getByText('Sign');

  await userEvent.click(button);

  expect(await screen.findByText('Thanks for signing the petition!')).toBeInTheDocument();
})

test('should display an error message to the user if the api returns an error', async () => {
  fetch.mockReject(new Error('Network Error'));

  render(App);

  const button = screen.getByText('Sign');

  await userEvent.click(button);

  expect(await screen.findByText('An error occured you are currently not able to sign the petition.')).toBeInTheDocument();
})
