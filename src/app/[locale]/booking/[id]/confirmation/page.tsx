type ConfirmationPageProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { id } = params;

  return (
    <main className="container">
      <h1>Booking confirmed</h1>
      <p>Your booking for office ID {id} has been confirmed.</p>
    </main>
  );
}

