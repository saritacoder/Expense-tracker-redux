import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../src/components/login/SignUp'; // Adjust the import according to your file structure

describe('SignUp Component', () => {

  // Case 1-> Testing email label is rendered
  test('renders email label correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    // Check if the label for email is rendered
    const emailLabel = screen.getByLabelText(/Your Email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  // Case 2-> Testing password label is rendered
  test('renders password label correctly', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );

    // Check if the label for email is rendered
    const passwordLabel = screen.getByLabelText(/Your password/i);
    expect(passwordLabel).toBeInTheDocument();
  });

  // Case 3-> Testing confirm password label is rendered
  test('should render confirm password input field in SignUp mode', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    // First, click the button to switch from Login to Sign Up mode
    const switchButton = screen.getByRole('button', { name: /Create Here/i }); // Changed to match the "Create Here" text
    fireEvent.click(switchButton); // Switch to SignUp mode
  
    // Now check if the confirm password input field is rendered
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);
    expect(confirmPasswordInput).toBeInTheDocument();
  });
  
  // Case 4-> Testing submit button text is correct (Login or Create Account)
  test('should render the correct submit button text', () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  
    // First, check the button when the form is in login mode
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toHaveTextContent('Login'); // If initially in login mode
  
    // After switching to SignUp mode, check the button text again
    const switchButton = screen.getByRole('button', { name: /Create Here/i });
    fireEvent.click(switchButton); // Switch to SignUp mode
  
    const signUpButton = screen.getByRole('button', { name: /Create Account/i });
    expect(signUpButton).toHaveTextContent('Create Account'); // After switching to SignUp mode
  });
  
});
