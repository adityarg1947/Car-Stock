import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";

const Payments = () => {

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/api/payments")
      .then((res) => res.json())
      .then((data) => {

        setPayments(data);

      })
      .catch((err) => {

        console.error(err);

      });

  }, []);

  return (

    <div className="flex flex-col gap-8 pb-10">

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

        Payment History

      </h1>

      {payments.length === 0 ? (

        <div className="glass-panel p-8 rounded-3xl text-center text-slate-500 dark:text-slate-400">

          No payments found

        </div>

      ) : (

        <div className="glass-panel rounded-3xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">

                  <th className="px-6 py-4">
                    ID
                  </th>

                  <th className="px-6 py-4">
                    Car
                  </th>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4">
                    Method
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                </tr>

              </thead>

              <tbody>

                {payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="border-t border-slate-200 dark:border-slate-700"
                  >

                    <td className="px-6 py-4">

                      #{payment.id}

                    </td>

                    <td className="px-6 py-4">

                      {payment.carName}

                    </td>

                    <td className="px-6 py-4">

                      {payment.paymentDate}

                    </td>

                    <td className="px-6 py-4">

                      {payment.paymentMethod}

                    </td>

                    <td className="px-6 py-4 font-bold">

                      ${Number(payment.amount || 0).toFixed(2)}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );

};

export default Payments;