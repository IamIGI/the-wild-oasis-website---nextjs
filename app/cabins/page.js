export const metadata = {
  title: 'Cabins',
};

async function Page() {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/users'
  );
  const data = await res.json();
  console.log({ data });
  return (
    <div>
      <h1>cabins page</h1>
    </div>
  );
}

export default Page;
