'use client';

import { useRef, useState } from 'react';
import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/Layout/Container';
import MoviesLine from '@/components/MoviesLine';
import SubMovieLine from '@/components/SubMovieLine';
import { MOVIE_TYPE } from '@/utils/constants';
import { toKebabCase } from '@/utils/convertString';

type Props = {
  movies: IMovie[];
  title: string;
  isMain: boolean;
};

const Row: React.FC<Props> = ({ movies, title, isMain }: Props) => {
  const pathname = usePathname();
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleGenerateUrl = () => {
    const kebabCaseString = toKebabCase(title);
    const path = pathname?.replaceAll('/', '');
    return path === MOVIE_TYPE.TV
      ? `/tv/${kebabCaseString}`
      : `/movies/${kebabCaseString}`;
  };

  return (
    <div className={`${isMain && 'pb-36'}`}>
      <div
        className={`${isMain ? 'h-40' : 'h-52'} space-y-0.5 md:space-y-2 px-4`}
      >
        <Container header={title} isTop={false}>
          <Link
            href={handleGenerateUrl()}
            className="absolute right-6 bg-gray-800 text-white text-sm cursor-pointer p-2 rounded-md hover:bg-red-500"
          >
            See more
          </Link>
          <div className="group relative md:-ml-2">
            <BiChevronLeftCircle
              className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
                !isMoved && 'hidden'
              }`}
              onClick={() => handleClick('left')}
            />

            <div
              ref={rowRef}
              className="flex items-center scrollbar-hide space-x-0.5 overflow-x-scroll md:space-x-3 md:p-2"
            >
              {isMain ? (
                <>
                  {movies?.map((movie) => (
                    <MoviesLine key={movie.id} movie={movie} />
                  ))}
                </>
              ) : (
                <>
                  {movies?.map((movie) => (
                    <SubMovieLine key={movie.id} movie={movie} />
                  ))}
                </>
              )}
            </div>
            <BiChevronRightCircle
              className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
              onClick={() => handleClick('right')}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Row;
