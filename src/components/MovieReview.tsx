import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import Container from '@/components/Layout/Container';
import { baseURL } from '@/utils/baseUrl';

type Props = {
  movieReview: IMovieReviewData[];
};

const MovieReview: React.FC<Props> = ({ movieReview }: Props) => {
  return (
    <>
      {movieReview.length > 1 && (
        <div className="px-4 pb-20">
          <Container header="Review">
            <div className="w-full h-[300px] overflow-x-hidden overflow-y-scroll scrollbar-hide">
              {movieReview.map((review) => (
                <div
                  key={review.id}
                  className="h-auto w-full px-12 py-12 bg-gray-900 mb-6 mt-6 rounded-md shadow-md"
                >
                  <div className="flex gap-8">
                    <Avatar
                      alt={review.author_details.name || review.author}
                      src={`${baseURL}${review.author_details.avatar_path}`}
                      sx={{ width: 56, height: 56 }}
                    />
                    <div>
                      <p className="text-xl font-semibold">
                        A review by {review.author}
                      </p>
                      <p className="text-sm">
                        Written by {review.author} on{' '}
                        {moment(review.created_at).format('MMM Do YYYY')}
                      </p>
                      <div className="w-[80%] py-6">
                        <p>{review.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default MovieReview;
