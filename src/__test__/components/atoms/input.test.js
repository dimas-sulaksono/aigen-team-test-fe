import Input from "@/components/atoms/Input"; // Pastikan path ini sesuai dengan lokasi file Input.js
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

describe("Input Component", () => {
  it("renders input dengan placeholder yang sesuai", () => {
    const { getByPlaceholderText } = render(<Input placeholder="username" />);

    const input = getByPlaceholderText("username");
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("username");
  });

  it("menerima dan menampilkan nilai yang diberikan (controlled component)", () => {
    const { getByDisplayValue } = render(
      <Input value="testValue" onChange={() => {}} />,
    );

    const input = getByDisplayValue("testValue");
    expect(input).toBeInTheDocument();
  });

  it("menggunakan defaultValue jika diberikan (uncontrolled component)", () => {
    const { getByDisplayValue } = render(<Input defaultValue="defaultText" />);

    const input = getByDisplayValue("defaultText");
    expect(input).toBeInTheDocument();
  });

  it("memanggil onChange saat nilai input berubah", () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="email" onChange={handleChange} />,
    );

    const input = getByPlaceholderText("email");
    fireEvent.change(input, { target: { value: "newemail@example.com" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("menggunakan atribut yang diberikan (disabled, required, readOnly)", () => {
    const { getByPlaceholderText } = render(
      <Input placeholder="password" disabled required readOnly />,
    );

    const input = getByPlaceholderText("password");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("required");
    expect(input).toHaveAttribute("readonly");
  });
});
