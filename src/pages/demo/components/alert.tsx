import { Alert } from '@/components/common/alert/alert'
import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import Container from '@/components/common/container/container'
import WarningIcon from '@/components/icons/warning/warning'
import { toast } from 'react-toastify'

const toastMessages = {
  success: 'To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience',
}
const AlertComponentDemo = () => {
  const fireTheToast = () => {
    toast.info(toastMessages.success)
    toast.error(toastMessages.success)
    toast.warn(toastMessages.success)
    toast.success(toastMessages.success)
  }
  return (
    <Container>
      <div className="flex gap-4 p-5 flex-wrap">
        <div className="w-[380px] px-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Alert>
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
              <Alert variant="warning">
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
              <Alert variant="danger">
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
              <Alert variant="success">
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
            </CardBody>
          </Card>
        </div>
        <div className="w-[380px] px-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert with Icon</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Alert className="flex gap-2">
                <WarningIcon className="flex-shrink-0" />
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
              <Alert variant="warning" className="flex gap-2">
                <WarningIcon className="flex-shrink-0" />
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
              <Alert variant="danger" className="flex gap-2">
                <WarningIcon className="flex-shrink-0" />
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
              <Alert variant="success" className="flex gap-2">
                <WarningIcon className="flex-shrink-0" />
                <span>To ensure security, large or suspicious withdrawal may take 1-24 hours for audit. Thank you for your patience</span>
              </Alert>
            </CardBody>
          </Card>
        </div>
        <div className="w-[380px] px-4">
          <Card>
            <CardHeader>
              <CardTitle>Toaster</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2">
              <Button kind="primary" variant="primary" onClick={fireTheToast}>
                Fire The Toast
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default AlertComponentDemo
