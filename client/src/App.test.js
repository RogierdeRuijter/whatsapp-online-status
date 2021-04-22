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
  fetch.mockResponse({});

  render(App);

  const button = screen.getByText('Sign');
  await userEvent.click(button);
  expect(button).toBeDisabled();

  expect(await screen.findByText('Thanks for signing the petition!')).toBeInTheDocument();
  expect(screen.queryByText('You are currently not able to sign the petition, because an error occured.')).not.toBeInTheDocument();
  expect(button).toBeDisabled();
});

test('should display an error message to the user if the api returns an error', async () => {
  fetch.mockRejectOnce(new Error('Network Error'));

  render(App);

  const button = screen.getByText('Sign');
  await userEvent.click(button);
  expect(button).toBeDisabled();

  expect(await screen.findByText('You are currently not able to sign the petition, because an error occured.')).toBeInTheDocument();
  expect(screen.getByText('Retry')).toBeInTheDocument();
  expect(screen.queryByText('Sign')).not.toBeInTheDocument();
});

test('should display the congrats message when retry button is clicked', async () => {
  render(App);
  
  fetch.mockRejectOnce(new Error('Network Error'));
  const button = screen.getByText('Sign');
  await userEvent.click(button);
  expect(button).toBeDisabled();

  expect(await screen.findByText('You are currently not able to sign the petition, because an error occured.')).toBeInTheDocument();
  
  const retryButton = screen.getByText('Retry'); 
  expect(retryButton).toBeInTheDocument();
  expect(screen.queryByText('Sign')).not.toBeInTheDocument();

  fetch.mockResponseOnce({});
  await userEvent.click(retryButton);
  // Would be really good if the API call could mock taking 100ms than testing these loading states would be easier to read
  expect(retryButton).toBeDisabled();
  expect(screen.queryByText('You are currently not able to sign the petition, because an error occured.')).not.toBeInTheDocument();

  expect(await screen.findByText('Thanks for signing the petition!')).toBeInTheDocument();
  expect(screen.queryByText('You are currently not able to sign the petition, because an error occured.')).not.toBeInTheDocument();
  expect(screen.getByText('Retry')).toBeInTheDocument();
  expect(retryButton).toBeDisabled();
});

