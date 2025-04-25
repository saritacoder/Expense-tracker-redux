import { render, screen } from "@testing-library/react";
import MainNavigation from "../src/components/header/MainNavigation";
import { BrowserRouter } from "react-router-dom";


//using "describe()" to group related tests together
describe("Header component", () => {

    //Case 1: Checking login button is present or not
    test('render main navigation', () => {
        
        // Arrange 
        render(
            // As MAinNavigation is using a useNavigate hook, so we need to wrap it in a BrowserRouter
            <BrowserRouter> 
                <MainNavigation />
            </BrowserRouter>
        );

        // Act
        //...nothing here we have to write in this section because we are not doing anything in this section

        // Assert
        const loginButton = screen.getByText('Login', { exact: false }); // exact: false to match any string containing 'hello'
        expect(loginButton).toBeInTheDocument(); // to check if the text is present in the DOM
    });

    //Case 2-> Checking Expense Tracker in heading
    test('render Expense Tracker in heading', () => {
        // Arrange
        render(
            <BrowserRouter>
                <MainNavigation />
            </BrowserRouter>
        );
        // Act
        //...nothing here we have to write in this section because we are not doing anything in this

        // Assert
        const expenseTracker = screen.getByText('Expense Tracker', { exact: false });
        expect(expenseTracker).toBeInTheDocument();
    });

})