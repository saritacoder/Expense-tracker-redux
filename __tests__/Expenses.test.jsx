import { render, screen } from '@testing-library/react';

import Expense from '../src/components/expenses/Expenses';

import { Provider } from 'react-redux';
import { Store } from '../src/store/Store';

const component = (
  <Provider store={Store}>
    <Expense />
  </Provider>
);

describe('Testing Expense', () => {
  test('Should display "No expenses found" when expense array is empty', () => {
    render(component);
   
    const noExpensesMessage = screen.queryByText('No expenses added yet', { exact: false }); // queryByText used to find the text in the component
    expect(noExpensesMessage).not.toBeInTheDocument();
  });

  test('Should display button with text "Add new expense"', () => {
    render(component);
    // expect(screen.getByRole('button')).toHaveTextContent('Add new expense');
    const button = screen.getByRole('button', { name: /Add new expense/i, class: 'btn btn-primary' });
    expect(button).toBeInTheDocument();
  });

  test('Should display heading "Total expense"', () => {
    render(component);
    // expect(screen.getByRole('heading', { name: /item expenses/i })).toBeInTheDocument();
    const heading = screen.getByRole('heading', { name: /item expenses/i });
    expect(heading).toBeInTheDocument();
  });

  test('Should display loading text while waiting for data', () => {
    render(component);
    // // Check that the loading text appears when data is being fetched
    // expect(screen.getByText(/Please wait, data is loading from API/i)).toBeInTheDocument();
    const loadingText = screen.getByText('Please wait, data is loading from API', {exact: false});
    expect(loadingText).toBeInTheDocument();
  });

  test('Should display list of expenses', async () => {
    window.fetch = vi.fn();

    // Added a mock response to the fetch function
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          key: 'k1',
          id: 'i1',
          amount: '12',
          description: 'Some description',
          category: 'Some category',
        },
      ],
    });

    render(component);

    const listItems = await screen.findAllByRole('listitem');  

    expect(listItems).not.toHaveLength(0);
  });
});