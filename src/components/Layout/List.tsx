'use client';

import { useRef } from 'react';
import Container from '@/components/Layout/Container';
import MoviesList from '@/components/MoviesList';

type Props = {
  movies: IMovie[];
  title: string;
};

const List: React.FC<Props> = ({ movies, title }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`space-y-0.5 md:space-y-2 px-4`}>
      <Container header={title} isTop={false}>
        <div className="group relative md:-ml-2">
          <div
            ref={rowRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3"
          >
            {movies && (
              <>
                {movies?.map((movie) => (
                  <MoviesList key={movie.id} movie={movie} />
                ))}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default List;
