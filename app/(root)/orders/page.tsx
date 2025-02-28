// import { getOrders } from "@/lib/actions/actions";
// import { getAuth } from "@clerk/nextjs/server";
// import { headers } from "next/headers";
// import Image from "next/image";
// const Orders = async () => {
//   const currentHeaders = await headers();
//   const { userId } = getAuth({ headers: currentHeaders });
//   console.log(userId)

// const currentHeaders = await headers();
// const authRequest = {
//   headers: {
//     ...Object.fromEntries(currentHeaders.entries()),
//   },
// };

// const { userId } = getAuth(authRequest);

// const orders = await getOrders(userId as string);

"use client";

import { getOrders } from "@/lib/actions/actions";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

const Orders = () => {
  const { userId } = useAuth();
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders(userId!);
      setOrderData(data);
    }
    fetchOrders();
  }, [userId]);

  return (
    <div className="px-10 py-5 max-sm:px-3">
      <p className="text-heading3-bold my-10">Your orders</p>
      {!orderData ||
        (orderData.length === 0 && (
          <p className="text-body-bold my-5">You have no orders yet</p>
        ))}

      <div className="flex flex-col gap-10">
        {orderData?.map((order: OrderType) => (
          <div
            key={order._id}
            className="flex flex-col gap-8 p-4 hover:bg-grey-1"
          >
            <div className="flex gap-20 max-md:flex-col max-md:gap-3">
              <p className="text-base-bold">Order ID: {order._id}</p>
              <p className="text-base-bold">
                Total Amount: ${order.totalAmount}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {order.products.map((orderItem: OrderItemType) => (
                <div key={orderItem.product._id} className="flex gap-4">
                  <Image
                    src={orderItem.product.media[0]}
                    alt={orderItem.product.title}
                    width={100}
                    height={100}
                    className="w-32 h-32 object-cover rounded-lg"
                  />

                  <div className="flex flex-col justify-between">
                    <p className="text-small-medium">
                      Title:{" "}
                      <span className="text-small-bold">
                        {orderItem.product.title}
                      </span>
                    </p>

                    {orderItem.color && (
                      <p className="text-small-medium">
                        Color:
                        <span className="text-small-bold">
                          {orderItem.color}
                        </span>
                      </p>
                    )}

                    {orderItem.size && (
                      <p className="text-small-medium">
                        Size:
                        <span className="text-small-bold">
                          {orderItem.size}
                        </span>
                      </p>
                    )}

                    <p className="text-small-medium">
                      Unit Price:
                      <span className="text-small-bold">
                        {orderItem.product.price}
                      </span>
                    </p>

                    <p className="text-small-medium">
                      Quantity:
                      <span className="text-small-bold">
                        {orderItem.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

export const dynamic = "force-dynamic";
