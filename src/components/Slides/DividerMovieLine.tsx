'use client';

import SwiperSlidePage from '@/components/Slides/SwiperSlidePage';
import { baseURL } from '@/utils/baseUrl';

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
