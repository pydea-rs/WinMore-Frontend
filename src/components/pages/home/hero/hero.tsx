import Container from '@/components/common/container/container'
import { useMediaBreakpoints } from '@/hooks/useMediaBreakpoints'
import { ElementProps } from '@/types/elements.types'
import classNames from 'classnames'
import Image from 'next/image'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const Hero: React.FC<ElementProps & { children: string[] }> = ({ className, children }) => {
  const { md } = useMediaBreakpoints()
  const classList = classNames({
    [`${className}`]: className,
  })
  console.log(children)
  return (
    <section className={classList}>
      <Container kind="boxed" className="px-5">
        <Swiper pagination={true} modules={[Pagination]} centeredSlides slidesPerView={1} spaceBetween={5}>
          {Boolean(children?.length) &&
            children.map((image, idx) => (
              <SwiperSlide key={idx} style={{ textAlign: 'center' }}>
                <div className="hidden md:block aspect-[1142/480]">
                  <Image
                    src={`/assets/images/${image}`}
                    alt="placeholder"
                    width="1142"
                    height="480"
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
                    src={`/assets/images/${image}`}
                    alt="placeholder"
                    width="1142"
                    height="226"
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
            ))}
        </Swiper>
      </Container>
    </section>
  )
}

export default Hero
