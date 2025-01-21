import Container from '@/components/common/container/container'
import { useMediaBreakpoints } from '@/hooks/useMediaBreakpoints'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Hero: React.FC<ElementProps> = (props) => {
  const { className } = props
  const { md } = useMediaBreakpoints()
  const classList = classNames({
    [`${className}`]: className,
  })

  return (
    <section className={classList}>
      <Container kind="boxed" className="!px-0">
        <Swiper pagination={true} modules={[Pagination]} centeredSlides slidesPerView={1} spaceBetween={5}>
          <SwiperSlide style={{ textAlign: 'center' }}>
            <div className="hidden md:block aspect-[1142/330]">
              <Image
                src={'/assets/images/1142x330.svg'}
                alt="placeholder"
                width={1142}
                height={330}
                style={{
                  height: '100%',
                  width: '100%',
                  margin: '0 auto',
                  borderRadius: '24px',
                }}
                className="object-center"
              />
            </div>

            <div className="block md:hidden aspect-[358/226]">
              <Image
                src={'/assets/images/258x226.svg'}
                alt="placeholder"
                width={1142}
                height={226}
                style={{
                  height: '100%',
                  width: '100%',
                  margin: '0 auto',
                  borderRadius: '24px',
                }}
                className="object-center"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ textAlign: 'center' }}>
            <div className="hidden md:block aspect-[1142/330]">
              <Image
                src={'/assets/images/1142x330.svg'}
                alt="placeholder"
                width={1142}
                height={330}
                style={{
                  height: '100%',
                  width: '100%',
                  margin: '0 auto',
                  borderRadius: '24px',
                }}
                className="object-center"
              />
            </div>

            <div className="block md:hidden aspect-[358/226]">
              <Image
                src={'/assets/images/258x226.svg'}
                alt="placeholder"
                width={1142}
                height={226}
                style={{
                  height: '100%',
                  width: '100%',
                  margin: '0 auto',
                  borderRadius: '24px',
                }}
                className="object-center"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </Container>
    </section>
  )
}

export default Hero
