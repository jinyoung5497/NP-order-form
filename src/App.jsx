import { Input, Subtitle } from "./Components";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { PRODUCT_LIST } from "./Constants/ProductLists";

export default function App() {
  const [productRows, setProductRows] = useState([
    { product: "", quantity: 1 },
  ]);

  const handleAddRow = () => {
    setProductRows([...productRows, { product: "", quantity: 1 }]);
  };

  const updateRow = (index, field, value) => {
    const updated = [...productRows];
    updated[index][field] = value;

    // Auto-add next row if this one is filled
    if (
      field === "product" &&
      index === productRows.length - 1 &&
      value &&
      updated[index].quantity > 0
    ) {
      handleAddRow();
    }

    setProductRows(updated);
  };

  const GOOGLE_WEBAPP_URL =
    "https://script.google.com/macros/s/AKfycbxoW6VXZNNqADfYqSdtGrdwhJhyChMh0_TQIJPUvrDfOok7xQ5KFaKc3k9OcfmY6QJgDQ/exec";

  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.any(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    const formData = new URLSearchParams();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);

    try {
      const response = await fetch(GOOGLE_WEBAPP_URL, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const result = await response.text();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
    }
  };

  useEffect(() => {
    console.log(productRows)
  }, [productRows])

  return (
    <>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center bg-white p-15 m-20 w-[600px] rounded-xl"
        >
          <div className="text-3xl font-semibold mb-5">Order request form</div>
          <p className="text-sm mb-10">
            After you fill out this order request, we will contact you to go
            over details and availability before the order is completed. If you
            would like faster service and direct information on current stock
            and pricing please contact us at Contact us through Whatsapp
            +82-10-7343-5497 or email me jinyoung@nexus-pharma.com.
          </p>
          <div className="w-full">
            <Subtitle title={"First Name"} />
            <Input id={"firstname"} {...register("firstName")} />
            <Subtitle title={"Last Name"} />
            <Input id={"lastname"} {...register("lastName")} />
            <Subtitle title={"Email"} />
            <Input id={"email"} {...register("email")} />
            <Subtitle title={"Phone Number"} />
            <Input id={"phone"} {...register("phone")} />
            <Subtitle title={"Products"} />
            {productRows.map((row, index) => (
              <div key={index} className="flex mb-2 gap-2">
                <select
                  value={row.product}
                  onChange={(e) => updateRow(index, "product", e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="">Select a product</option>
                  {PRODUCT_LIST.map((product, i) => (
                    <option key={i} value={product}>
                      {product}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="1"
                  value={row.quantity}
                  onChange={(e) =>
                    updateRow(index, "quantity", parseInt(e.target.value))
                  }
                  className="border p-2 w-24"
                  placeholder="Qty"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
