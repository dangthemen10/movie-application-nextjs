import { useState } from 'react';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook, BsPinterest } from 'react-icons/bs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CircularRate from '@/components/Common/CircularRate';
import { baseURL } from '@/utils/baseUrl';

type Props = {
  userMovieData: IFavoriteMovieData[];
  userPersonData: IFavoritePeopleData[];
  userData: IUserData;
};

const MainProfile: React.FC<Props> = ({
  userMovieData,
  userPersonData,
  userData
}: Props) => {
  const router = useRouter();
  const [ifFavorite, setIsFavouring] = useState(true);

  return (
    <div className="header__wrapper text-white">
      <header
        style={{
          width: '100%',
          background:
            'url("https://source.unsplash.com/1600x900/?nature,photography,technology") no-repeat 50% 20% / cover',
          minHeight: 'calc(100px + 15vw)'
        }}
      ></header>
      <div className="cols__container">
        <div
          className="left__col"
          style={{
            padding: '25px 20px',
            textAlign: 'center',
            maxWidth: '350px',
            position: 'relative',
            margin: '0 auto'
          }}
        >
          <div className="absolute top-[-60px] left-[50%] translate-x-[-50%]">
            <Image
              src={userData.userPhotoUrl}
              alt={userData.name}
              className="w-[100px] height-[100px] rounded-full shadow-md block border-2 border-gray-400 px-1 py-1"
              width={100}
              height={100}
            />
          </div>
          <h2 className="mt-[60px] md:mt-[40px] font-bold text-[22px] mb-[5px]">
            {userData.name}
          </h2>
          <p className="text-[0.9rem] text-[#818181] m-[0]">
            {userData.country}
          </p>
          <p className="text-[0.9rem] text-[#818181] m-[0]">{userData.email}</p>

          <ul className="justify-between relative mt-[35px] mb-[0] after:absolute after:bottom-[-16px] after:block after:bg-[#cccccc] after:h-[1px] after:w-[100%]">
            <li className="flex flex-col text-[#818181] text-[0.9rem]">
              <span className="text-gray-400 font-semibold">4,073</span>
              Followers
            </li>
            <li className="flex flex-col text-[#818181] text-[0.9rem]">
              <span className="text-gray-400 font-semibold">322</span>Following
            </li>
            <li className="flex flex-col text-[#818181] text-[0.9rem]">
              <span className="text-gray-400 font-semibold">200,543</span>
              Attraction
            </li>
          </ul>

          <div className="content">
            <ul className="flex gap-[30px] justify-center items-center mt-[25px]">
              <li className="">
                <BsFacebook />
              </li>
              <i className="">
                <BsPinterest />
              </i>
              <i className="">
                <AiFillInstagram />
              </i>
              <i className="">
                <AiFillTwitterCircle />
              </i>
            </ul>
          </div>
        </div>
        <div className="right__col">
          <nav className="flex items-center pt-[30px] justify-between flex-col">
            <ul className="flex gpa-[20px] flex-col pb-6">
              <li onClick={() => setIsFavouring(true)}>
                <a
                  className={`uppercase text-gray-500 ${
                    ifFavorite &&
                    'bg-gray-900 font-medium border border-gray-800 px-2.5 py-2.5'
                  }`}
                  href="#"
                >
                  Favorite Movies
                </a>
              </li>
              <li onClick={() => setIsFavouring(false)}>
                <a
                  className={`uppercase text-gray-500 ${
                    !ifFavorite &&
                    'bg-gray-900 font-medium border border-gray-800 px-2.5 py-2.5'
                  }`}
                  href="#"
                >
                  Favorite Peoples
                </a>
              </li>
            </ul>
            {/*   <button className="bg-[#0091ff] text-white border-none px-6 rounded-md cursor-pointer mt-[20px] py-2 hover:opacity-[0.8]">
              Follow
            </button> */}
          </nav>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '20px'
            }}
          >
            {ifFavorite ? (
              <>
                {userMovieData.map((movie) => (
                  <motion.div
                    key={movie._id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="relative w-[180px] cursor-pointer"
                    onClick={() =>
                      movie.title
                        ? router.push(`/details/movie${movie.movieId}`)
                        : router.push(`/details/${movie.movieId}`)
                    }
                  >
                    <Image
                      className="block object-cover"
                      src={`${baseURL}${movie.poster_path}`}
                      alt="Photo"
                      width={100}
                      height={100}
                    />
                    <>
                      <div className="absolute top-[190px] z-50 items-center ml-6 w-[160px]">
                        <CircularRate
                          value={movie.vote_average}
                          isPoster={true}
                        />
                        <p className="text-sm font-medium truncate">
                          {movie?.title || movie?.name || movie.original_name!}
                        </p>
                      </div>
                      <div className="absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent bottom-0 z-20" />
                    </>
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {userPersonData.map((cast) => (
                  <motion.div
                    key={cast._id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0, 0.71, 0.2, 1.01]
                    }}
                    className="relative w-[180px] cursor-pointer"
                    onClick={() => router.push(`/cast/${cast.personId}`)}
                  >
                    <Image
                      className="block object-cover"
                      src={`${baseURL}${cast.profile_path}`}
                      alt="Photo"
                      width={180}
                      height={180}
                    />
                    <>
                      <div className="absolute top-[190px] z-50 items-center ml-6 w-[160px]">
                        <CircularRate
                          value={cast.popularity / 100}
                          isPoster={true}
                        />
                        <p className="text-sm font-medium truncate">
                          {cast.name}
                        </p>
                      </div>
                      <div className="absolute w-full h-[200px] bg-gradient-to-t from-black to-transparent bottom-0 z-20" />
                    </>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;

/*https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80*/
