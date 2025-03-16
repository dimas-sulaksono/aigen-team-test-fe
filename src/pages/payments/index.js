import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Section from "@/components/atoms/Section";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaymentsPage = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const paymentOptions = {
    uas: 1000000,
    uts: 750000,
    "study-tour": 1500000,
  };

  const handlePaymentChange = (e) => {
    const selectedPayment = e.target.value;
    setAmount(paymentOptions[selectedPayment] || "");
  };

  const handlePayNow = async (e) => {
    e.preventDefault();

    const payload = {
      payment_name: e.target.payment_name.value,
      amount: e.target.amount.value,
      description: e.target.description.value,
      payment_type_id: e.target.payment_type_id.value,
    };

    console.log("Payload to be sent:", payload);
  };

  return (
    <Section className="">
      <div className="rounded-md bg-white p-6 shadow">
        <h1 className="mb-8 text-xl font-medium">Make a payment</h1>
        <Form onSubmit={handlePayNow}>
          <div className="mb-5 flex flex-col gap-4 lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name">Student Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={"Enter student name"}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-gray-900"
                readOnly={true}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name">NIS</label>
              <Input
                type="number"
                name="nis"
                id="nis"
                placeholder={"Enter NIS"}
                readOnly={true}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-gray-900"
              />
            </div>
          </div>
          <div className="mb-5 flex flex-col lg:grid lg:grid-cols-1">
            <label htmlFor="payment_name">Payment name</label>
            <Input
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-gray-900"
              name="payment_name"
              id="payment_name"
              type="text"
              placeholder={"Insert Patment Name"}
            />
          </div>
          <div className="mb-5 flex flex-col lg:grid lg:grid-cols-1">
            <label htmlFor="description">Description</label>
            <textarea
              rows={4}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-gray-900"
              name="description"
              id="description"
              type="text"
              placeholder={"Insert Description Payment"}
            />
          </div>
          <div className="mb-5 flex flex-col lg:grid lg:grid-cols-1">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="payment_type_id">Payment for</label>
              <select
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-gray-900"
                name="payment_type_id"
                id="payment_type_id"
                onChange={handlePaymentChange}
              >
                <option value="">Select payment for</option>
                <option value="uas">UAS</option>
                <option value="uts">UTS</option>
                <option value="study-tour">Study Tour</option>
              </select>
            </div>
          </div>
          <div className="mb-5 flex flex-col lg:grid lg:grid-cols-1">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount">Amount</label>
              <Input
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-gray-900"
                name="amount"
                id="amount"
                type="text"
                value={amount}
                disabled
                placeholder={"Enter amount"}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-slate-800 py-2 text-white hover:bg-slate-900"
          >
            Pay Now
          </Button>
        </Form>
      </div>
    </Section>
  );
};

export default PaymentsPage;
