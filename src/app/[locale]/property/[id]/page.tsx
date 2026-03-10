type PropertyPageProps = {
  params: {
    locale: string;
    id: string;
  };
};

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  return (
    <main className="container">
      <h1>Property detail</h1>
      <p>Details for office ID: {id}.</p>
    </main>
  );
}

