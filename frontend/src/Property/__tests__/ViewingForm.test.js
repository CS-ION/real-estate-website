const React = require("react");
const { render, screen, fireEvent } = require("@testing-library/react");
const ViewingForm = require("../ViewingForm");

// Mock the setViewForm function
const mockSetViewForm = jest.fn();

beforeEach(() => {
  render(React.createElement(ViewingForm, { setViewForm: mockSetViewForm }));
});

test("it renders the form elements", () => {
  // Ensure the form and its elements are rendered
  expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  expect(
    screen.getByText("Select the days you are available:")
  ).toBeInTheDocument();
  expect(screen.getByText("Sunday")).toBeInTheDocument();
  expect(screen.getByText("Monday")).toBeInTheDocument();
  expect(screen.getByText("Tuesday")).toBeInTheDocument();
  expect(screen.getByText("Wednesday")).toBeInTheDocument();
  expect(screen.getByText("Thursday")).toBeInTheDocument();
  expect(screen.getByText("Friday")).toBeInTheDocument();
  expect(screen.getByText("Saturday")).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText(
      "Enter a detailed description about your availability eg. time of day, etc."
    )
  ).toBeInTheDocument();
  expect(screen.getByText("SUBMIT REQUEST")).toBeInTheDocument();
  expect(screen.getByText("CLOSE FORM")).toBeInTheDocument();
});

test("it handles form submission and closes the form", () => {
  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText("First Name"), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText("Last Name"), {
    target: { value: "Doe" },
  });
  fireEvent.click(screen.getByText("Sunday"));
  fireEvent.click(screen.getByText("Monday"));
  fireEvent.click(screen.getByText("Tuesday"));
  fireEvent.click(screen.getByText("Wednesday"));
  fireEvent.click(screen.getByText("Thursday"));
  fireEvent.click(screen.getByText("Friday"));
  fireEvent.click(screen.getByText("Saturday"));
  fireEvent.change(
    screen.getByPlaceholderText(
      "Enter a detailed description about your availability eg. time of day, etc."
    ),
    { target: { value: "Sample description" } }
  );

  // Submit the form
  fireEvent.click(screen.getByText("SUBMIT REQUEST"));

  // Check if setViewForm is called to close the form
  expect(mockSetViewForm).toHaveBeenCalledWith(false);
});

test("it displays validation errors", () => {
  // Submit the form without filling in any fields
  fireEvent.click(screen.getByText("SUBMIT REQUEST"));

  // Check if the alert function is called with the validation error message
  expect(global.alert).toHaveBeenCalledWith(
    "Validation errors: All fields are mandatory"
  );

  // Clear the alert function to prevent side effects on other tests
  global.alert.mockClear();

  // Fill in a description longer than 300 characters
  fireEvent.change(
    screen.getByPlaceholderText(
      "Enter a detailed description about your availability eg. time of day, etc."
    ),
    {
      target: { value: "A".repeat(301) },
    }
  );

  // Submit the form
  fireEvent.click(screen.getByText("SUBMIT REQUEST"));

  // Check if the alert function is called with the description length error message
  expect(global.alert).toHaveBeenCalledWith(
    "Validation errors: Description must be 300 characters or less"
  );
});

test("it closes the form when the 'CLOSE FORM' button is clicked", () => {
  fireEvent.click(screen.getByText("CLOSE FORM"));

  // Check if setViewForm is called to close the form
  expect(mockSetViewForm).toHaveBeenCalledWith(false);
});
