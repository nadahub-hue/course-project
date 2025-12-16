import Login from "../Login"
import { render, screen, fireEvent } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import reducer from "../../slices/userSlice"
import { configureStore } from "redux-mock-store"
//import { configureStore } from "@reduxjs/toolkit"

const myMockStore = configureStore([])
const myStore = myMockStore({
    user: {
        user: null,
        msg: null,
        loading: false
    }
})


test("To get snapshot of Login.js UI", () => {
    const { container } = render(
        <Provider store={myStore}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    )
    expect(container).toMatchSnapshot()
})

const myTestInitVal = {
    user: null,
    msg: null,
    loading: false
}

test("Should return initial state", () => {
    expect(
        reducer(undefined, { type: undefined })
    ).toEqual(myTestInitVal)
})


test("To test login ID is valid email", () => {
    render(
        <Provider store={myStore}>
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        </Provider>
    );

    //const loginInput = screen.getByLabelText(/x/i);
    const loginInput = screen.getByTestId("x")

    // Valid email format. Here we mimic that user enters valid.email@example.com in the email text field. 
    // If the email format matches then test case will be passed otherwise testcase will be failed
    //for Pass test case
    fireEvent.change(loginInput, { target: { value: "valid.email@example.om" } });

    //for Fail test case
    //fireEvent.change(emailInput, { target: { value: 'valid.email@example' } });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(loginInput.value)).toBe(true);
})




