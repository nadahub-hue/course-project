import Home from "../Home"
import {render} from "@testing-library/react"

test("To test the UI of Home.js", () => {
    const {container} = render(<Home />)
    expect(container).toMatchSnapshot()
})