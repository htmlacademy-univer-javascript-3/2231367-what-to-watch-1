import {render, screen} from '@testing-library/react';
import App from './app';

const testData: {
  title: string,
  genre: string,
  year: number
} = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014
};

test('Renders app-component', () => {
  render(<App {...testData}/>);
  const textElement = screen.getByText(/Hello, world!/i);
  expect(textElement).toBeInTheDocument();
});
