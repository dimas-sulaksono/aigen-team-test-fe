import Button from "@/components/atoms/Button";
import Form from "@/components/atoms/Form";
import Input from "@/components/atoms/Input";
import Section from "@/components/atoms/Section";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import React, { useState } from "react";

const PaymentsPage = () => {
  const [amount, setAmount] = useState("");

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
    <Section className="min-h-screen">
      <div className="bg-white shadow p-6 rounded-md">
        <h1 className="text-xl font-medium mb-8">Make a payment</h1>
        <Form onSubmit={handlePayNow}>
          <div className="lg:grid lg:grid-cols-2 flex flex-col mb-5 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name">Student Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={"Enter student name"}
                className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full py-1.5 px-3"
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
                className=" bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full py-1.5 px-3"
              />
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-1 flex flex-col mb-5">
            <label htmlFor="payment_name">Payment name</label>
            <Input
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full py-1.5 px-3"
              name="payment_name"
              id="payment_name"
              type="text"
              placeholder={"Insert Patment Name"}
            />
          </div>
          <div className="lg:grid lg:grid-cols-1 flex flex-col mb-5">
            <label htmlFor="description">Description</label>
            <textarea
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full py-1.5 px-3"
              name="description"
              id="description"
              type="text"
              placeholder={"Insert Description Payment"}
            />
          </div>
          <div className="lg:grid lg:grid-cols-1 flex flex-col mb-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="payment_type_id">Payment for</label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full py-1.5 px-3"
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
          <div className="lg:grid lg:grid-cols-1 flex flex-col mb-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="amount">Amount</label>
              <Input
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full py-1.5 px-3"
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
            className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-lg py-2 cursor-pointer"
          >
            Pay Now
          </Button>
        </Form>
      </div>
    </Section>
  );
};

export default PaymentsPage;
