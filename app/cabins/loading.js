import Spinner from '@/app/_components/Spinner';

function loading() {
  //DEFAULT next.js loading data, it is displayed when given component loads
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl text-primary-200">
        Loading cabin data ...
      </p>
    </div>
  );
}

export default loading;
