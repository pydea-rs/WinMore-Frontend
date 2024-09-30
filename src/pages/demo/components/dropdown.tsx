import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import Container from '@/components/common/container/container'
import Dropdown from '@/components/common/dropdown/dropdown'
import DropdownButton from '@/components/common/dropdown/dropdownButton/dropdownItem'
import DropdownItem from '@/components/common/dropdown/dropdownItem/dropdownItem'
import DropdownList from '@/components/common/dropdown/dropdownList/dropdownList'
import DropdownMenuButton from '@/components/common/dropdown/dropdownMenuButton/dropdownMenuButton'
import ChevronRightIcon from '@/components/icons/chevronRight/chevronRight'
import LogoutIcon from '@/components/icons/logout/logout'
import MoneyIcon from '@/components/icons/money/money'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const DropdownComponentDemo = () => {
  const menuItems = [
    {
      id: '1',
      title: 'Profile',
      link: '/',
    },
    ,
    {
      id: '2',
      title: 'Wallet',
      link: '/',
    },
    {
      id: '3',
      title: 'Messages',
      link: '/',
    },
  ]
  return (
    <Container>
      <div className="flex gap-4 p-5 flex-wrap">
        <div className="w-[380px] px-4"></div>
        <div className="w-[380px] px-4">
          <Card>
            <CardHeader>
              <CardTitle>Dropdown - custom</CardTitle>
            </CardHeader>
            <CardBody className="flex flex-col gap-2 items-center">
              <Dropdown>
                <DropdownMenuButton>
                  Options
                  <ChevronDownIcon className="size-4 fill-white/60" />
                </DropdownMenuButton>
                <DropdownList className="relative flex flex-col w-[310px] p-6 gap-y-2.5">
                  {/* Background Layer */}
                  <div
                    className="absolute top-0 left-0 w-full h-full z-10 bg-cover bg-repeat opacity-20 pointer-events-none"
                    style={{ backgroundImage: `url(/assets/images/glitch.png)` }}
                  />

                  {/* User's points */}
                  <Button kind="gradient" variant="yellow-dark" className="flex justify-between font-medium font-dmSans">
                    <div className="flex items-center justify-between gap-x-2 w-full">
                      <MoneyIcon className="flex-shrink-0 text-yellow-500" />
                      13941
                    </div>
                  </Button>

                  {/* Menu items */}
                  {menuItems.map((menu) => {
                    return (
                      <DropdownItem key={menu?.id}>
                        <DropdownButton href={menu?.link} className="text-sm font-medium px-3 py-2 justify-between items-center  data-[focus]:bg-white/10">
                          {menu?.title}
                          <ChevronRightIcon className="w-6 text-main group-data-[focus]:text-white" />
                          {/* <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd> */}
                        </DropdownButton>
                      </DropdownItem>
                    )
                  })}

                  {/* Logout */}
                  <Button className="gap-x-2" variant="danger" kind="primary" full>
                    <LogoutIcon className="w-6" />
                    <span>LogOut</span>
                  </Button>
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
