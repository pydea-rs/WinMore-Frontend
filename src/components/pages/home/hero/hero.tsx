import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Hero = () => {
  return (
    <div className="w-full">
      <Swiper pagination={true} modules={[Pagination]} centeredSlides slidesPerView={1} spaceBetween={30}>
        <SwiperSlide style={{ textAlign: 'center' }}>
          <Image
            src={'/assets/images/1142x330.svg'}
            alt="placeholder"
            width={1142}
            height={330}
            style={{
              width: '100%',
              margin: '0 auto',
              borderRadius: '24px',
            }}
          />
        </SwiperSlide>
        <SwiperSlide style={{ textAlign: 'center' }}>
          <Image
            src={'/assets/images/1142x330.svg'}
            alt="placeholder"
            width={1142}
            height={330}
            style={{
              width: '100%',
              margin: '0 auto',
              borderRadius: '24px',
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Hero
