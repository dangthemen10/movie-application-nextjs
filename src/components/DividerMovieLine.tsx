'use client';

import { baseURL } from '@/utils/baseUrl';
import SwiperSlidePage from '@/components/SwiperSlidePage';

type Props = {
  netflixOriginals: IMovie[];
  horrorMovies: IMovie[];
};

const DividerMovieLine: React.FC<Props> = ({
  netflixOriginals,
  horrorMovies
}: Props) => {
  return (
    <div className="h-[60vh] space-y-0.5 md:space-y-2 px-4">
      {/*  <h2 className="w-80 cursor-pointer text-xl font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl uppercase">
        Recombed
      </h2> */}
      <div className="group relative md:-ml-2">
        <div className="inline-block md:flex space-x-10">
          <SwiperSlidePage movies={netflixOriginals} baseUrl={baseURL} />
          <SwiperSlidePage movies={horrorMovies} baseUrl={baseURL} />
        </div>
      </div>
    </div>
  );
};

export default DividerMovieLine;
