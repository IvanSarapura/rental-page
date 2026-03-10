type BookingPageProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default function BookingPage({ params }: BookingPageProps) {
  const { id } = params;

  return (
    <main className="container">
      <h1>Booking</h1>
      <p>Start your booking for office ID: {id}.</p>
    </main>
  );
}

