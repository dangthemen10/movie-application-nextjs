import Container from '@/components/Layout/Container';
import ImageSwiper from '@/components/Slides/ImageSwiper';
import { baseURL } from '@/utils/baseUrl';

type Props = {
  movieImage: IMovieImage[];
  movieDetails: IDetails;
};

const EffectCardsSweeper: React.FC<Props> = ({
  movieImage,
  movieDetails
}: Props) => {
  return (
    <div className="h-[70h] px-4">
      <Container header="Related Image & production companies">
        <div className="group relative md:-ml-2">
          <div className="inline-block md:flex justify-center py-4">
            <ImageSwiper movieImage={movieImage} />
            <div className="h-[60vh] w-[90vh] items-center space-y-8">
              {movieDetails.production_companies
                ?.slice(0, 4)
                .map((companies, index) => (
                  <div
                    key={companies.id}
                    className="flex justify-start space-x-10 items-center"
                  >
                    <p className="text-lg font-medium">
                      {index + 1}. {companies.name}
                    </p>
                    {companies.logo_path && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`${baseURL}${companies.logo_path}`}
                        className="w-24"
                        alt={companies.name}
                      />
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EffectCardsSweeper;
