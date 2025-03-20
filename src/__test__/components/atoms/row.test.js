import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Row } from "@/components/atoms/Row"; // Sesuaikan path dengan lokasi file Row.js

describe("Row Component", () => {
  const mockData = {
    name: "John Doe",
    status: "Paid",
    deletedAt: null,
  };

  const setDataDetails = jest.fn();
  const handleShow = jest.fn();
  const handleDownload = jest.fn();

  it("renders row dengan data yang diberikan", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <Row
            data={mockData}
            setDataDetails={setDataDetails}
            handleShow={handleShow}
            handleDownload={handleDownload}
          />
        </tbody>
      </table>,
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Paid")).toBeInTheDocument();
  });

  it("memanggil setDataDetails dan handleShow saat tombol Details diklik", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <Row
            data={mockData}
            setDataDetails={setDataDetails}
            handleShow={handleShow}
            handleDownload={handleDownload}
          />
        </tbody>
      </table>,
    );

    const detailsButton = getByText("Details");
    fireEvent.click(detailsButton);

    expect(setDataDetails).toHaveBeenCalledWith(mockData);
    expect(handleShow).toHaveBeenCalledTimes(1);
  });

  it("memanggil handleDownload saat tombol Download diklik jika status 'Paid'", () => {
    const { getByText } = render(
      <table>
        <tbody>
          <Row
            data={mockData}
            setDataDetails={setDataDetails}
            handleShow={handleShow}
            handleDownload={handleDownload}
          />
        </tbody>
      </table>,
    );

    const downloadButton = getByText("Download");
    fireEvent.click(downloadButton);

    expect(handleDownload).toHaveBeenCalledWith(mockData);
  });

  it("tidak bisa mengklik tombol Download jika status bukan 'Paid'", () => {
    const unpaidData = { ...mockData, status: "Pending" };

    const { getByText } = render(
      <table>
        <tbody>
          <Row
            data={unpaidData}
            setDataDetails={setDataDetails}
            handleShow={handleShow}
            handleDownload={handleDownload}
          />
        </tbody>
      </table>,
    );

    const downloadButton = getByText("Download");
    expect(downloadButton).toHaveClass("pointer-events-none");
  });

  it("menonaktifkan tombol jika data memiliki deletedAt", () => {
    const deletedData = { ...mockData, deletedAt: "2024-03-20" };

    const { container } = render(
      <table>
        <tbody>
          <Row
            data={deletedData}
            setDataDetails={setDataDetails}
            handleShow={handleShow}
            handleDownload={handleDownload}
          />
        </tbody>
      </table>,
    );

    expect(container.querySelector("tr")).toHaveClass(
      "pointer-events-none bg-gray-200",
    );
  });
});
