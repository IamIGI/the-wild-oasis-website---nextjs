import CabinCard from './CabinCard';
import { getCabins } from '../_lib/data-service';
import { connection } from 'next/server';

async function CabinList({ filter }) {
  // await connection();
  const cabins = await getCabins();

  if (!cabins.length) return null;
  console.log({ filter });
  let displayedCabins;
  if (filter === 'all') displayedCabins = cabins;
  if (filter === 'small')
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity <= 3
    );
  if (filter === 'medium')
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity >= 4 && c.maxCapacity <= 7
    );
  if (filter === 'large')
    displayedCabins = cabins.filter(
      (c) => c.maxCapacity >= 8
    );

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
