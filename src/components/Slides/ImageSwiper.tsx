import Image from 'next/image';
import { motion } from 'framer-motion';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { baseURL } from '@/utils/baseUrl';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Import Swiper styles
import 'swiper/css';

type Props = {
  movieImage: IMovieImage[];
};

const ImageSwiper: React.FC<Props> = ({ movieImage }: Props) => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[50vh] w-[90vh]"
      >
        {movieImage?.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
              }}
              className="relative h-[50vh] w-[90vh] min-w-[150px] cursor-pointer transition-transform duration-200 ease-out  md:hover:scale-105"
            >
              <div>
                <Image
                  src={`${baseURL}/${image?.file_path}`}
                  alt={image.file_path}
                  layout="fill"
                  className="rounded-md"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSwiper;
