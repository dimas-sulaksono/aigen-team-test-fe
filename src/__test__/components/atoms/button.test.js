import Button from "@/components/atoms/Button"; // Sesuaikan path dengan lokasi file Button.js
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

describe("Button Component", () => {
  it("renders button dengan teks yang sesuai", () => {
    const { getByText } = render(<Button>Click Me</Button>);

    const button = getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("memanggil onClick saat tombol diklik", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("tidak memanggil onClick jika tombol dalam keadaan disabled", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick} disabled>
        Click Me
      </Button>,
    );

    const button = getByText("Click Me");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it("menggunakan className yang diberikan", () => {
    const { getByText } = render(
      <Button className="custom-class">Click Me</Button>,
    );

    const button = getByText("Click Me");
    expect(button).toHaveClass("custom-class");
  });

  it("menggunakan atribut type yang diberikan", () => {
    const { getByText } = render(<Button type="submit">Submit</Button>);

    const button = getByText("Submit");
    expect(button).toHaveAttribute("type", "submit");
  });
});
