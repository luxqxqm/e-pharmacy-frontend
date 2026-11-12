export default async function ProductPage({
  params,
}: PageProps<'/product/[id]'>) {
  const { id } = await params;

  return (
    <div className="container">
      <h1>Product {id}</h1>
    </div>
  );
}
