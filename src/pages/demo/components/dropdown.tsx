import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import Container from '@/components/common/container/container'
import Dropdown from '@/components/common/dropdown/dropdown'
import DropdownButton from '@/components/common/dropdown/dropdownButton/dropdownButton'
import DropdownList from '@/components/common/dropdown/dropdownList/dropdownList'
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/20/solid'

const DropdownComponentDemo = () => {
  return (
    <Container>
      <div className="flex gap-4 p-5 flex-wrap">
        <div className="w-[380px] px-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 items-center">
              <Dropdown as={'div'}>
                <DropdownButton>
                  Options
                  <ChevronDownIcon className="size-4 fill-white/60" />
                </DropdownButton>
                <DropdownList>
                  <DropdownButton>
                    <PencilIcon className="size-4 fill-white/30" />
                    Duplicate
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
                  </DropdownButton>
                </DropdownList>
              </Dropdown>
            </CardBody>
          </Card>
        </div>
      </div>
    </Container>
  )
}

export default DropdownComponentDemo
