import { Avatar } from '@/components/common/avatar/avatar'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import Container from '@/components/common/container/container'

const AlertComponentDemo = () => {
  return (
    <Container>
      <div className="flex gap-4 p-5 flex-wrap">
        <div className="w-[380px] px-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Avatar size="sm" src="/assets/images/sol.png" alt="sol" />
              <Avatar size="md" src="/assets/images/sol.png" alt="sol" />
              <Avatar size="lg" src="/assets/images/sol.png" alt="sol" />
              <Avatar size="xl" src="/assets/images/sol.png" alt="sol" />
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default AlertComponentDemo
