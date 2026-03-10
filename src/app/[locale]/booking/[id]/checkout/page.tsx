type CheckoutPageProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default function CheckoutPage({ params }: CheckoutPageProps) {
  const { id } = params;

  return (
    <main className="container">
      <h1>Checkout</h1>
      <p>Complete the booking for office ID: {id}.</p>
    </main>
  );
}

