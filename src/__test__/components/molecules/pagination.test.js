import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pagination } from "@/components/molecules/Pagination";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Pagination Component", () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({
      pathname: "/current-page",
      query: {},
      push: pushMock,
    });
  });

  it("tidak merender jika totalPages lebih kecil atau sama dengan pageNumber", () => {
    const { container } = render(
      <Pagination pageable={{ totalPages: 1, pageable: { pageNumber: 1 } }} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("memanggil router.push dengan parameter yang benar saat halaman berubah", () => {
    const pageableMock = {
      totalPages: 5,
      pageable: { pageNumber: 1, size: 10, numberOfElements: 10 },
      first: false,
      last: false,
    };

    const { getByText } = render(<Pagination pageable={pageableMock} />);
    const nextPageButton = getByText("3");

    fireEvent.click(nextPageButton);

    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/current-page",
      query: { page: 3 },
    });
  });

  it("tombol 'Previous' tidak bisa diklik jika halaman pertama", () => {
    const pageableMock = {
      totalPages: 5,
      pageable: { pageNumber: 0, size: 10, numberOfElements: 10 },
      first: true,
      last: false,
    };

    const { container } = render(<Pagination pageable={pageableMock} />);
    const previousButton = container.querySelector("li:first-child");

    fireEvent.click(previousButton);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("tombol 'Next' tidak bisa diklik jika halaman terakhir", () => {
    const pageableMock = {
      totalPages: 3,
      pageable: { pageNumber: 2, size: 10, numberOfElements: 10 },
      first: false,
      last: true,
    };

    const { container } = render(<Pagination pageable={pageableMock} />);
    const nextButton = container.querySelector("li:last-child");

    fireEvent.click(nextButton);
    expect(pushMock).not.toHaveBeenCalled();
  });
});
