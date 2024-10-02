import { Avatar } from '@/components/common/avatar/avatar'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import Container from '@/components/common/container/container'
import { Checkbox } from '@/components/common/form/checkbox/checkbox'
import { CheckboxGroup } from '@/components/common/form/checkboxGroup/checkboxGroup'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { InputIcon } from '@/components/common/form/inputIcon/inputIcon'
import { Label } from '@/components/common/form/label/label'
import { NumberInput } from '@/components/common/form/numberInput/numberInput'
import { Radio } from '@/components/common/form/radio/radio'
import { RadioCard } from '@/components/common/form/radioCard/radioCard'
import { RadioCardGroup } from '@/components/common/form/radioCardGroup/radioCardGroup'
import { RadioGroup } from '@/components/common/form/radioGroup/radioGroup'
import Select from '@/components/common/form/select/select'
import SelectButton from '@/components/common/form/select/selectButton/selectButton'
import SelectIcon from '@/components/common/form/select/selectIcon/selectIcon'
import SelectList from '@/components/common/form/select/selectList/selectList'
import SelectOption from '@/components/common/form/select/selectOption/selectOption'
import { TextForm } from '@/components/common/form/textForm/textForm'
import { Input } from '@/components/common/form/textInput/textInput'
import CentIcon from '@/components/icons/cent/cent'
import EmailIcon from '@/components/icons/email/email'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { useHelper } from '@/hooks/usehelper'
import { TType } from '@/types/global.types'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const mockRadioData1 = [
  {
    id: '33',
    value: 'b1',
    name: 'radio-1',
    label: 'USDC',
    amount: '0.00',
    images: [
      { src: '/assets/images/dollar.png', alt: 'dollar' },
      { src: '/assets/images/tether.png', alt: 'tether' },
    ],
  },
  {
    id: '44',
    value: 'c1',
    label: 'USDT',
    name: 'radio-1',
    amount: '0.00',
    images: [
      { src: '/assets/images/dollar.png', alt: 'dollar' },
      { src: '/assets/images/tether.png', alt: 'tether' },
    ],
  },
]

const mockRadioData2 = [
  {
    id: '55',
    value: 'd1',
    name: 'radio-2',
    label: 'EASY',
  },
  {
    id: '66',
    value: 'h1',
    label: 'MEDIUM',
    name: 'radio-2',
  },
  {
    id: '77',
    value: 'g1',
    label: 'HARD',
    name: 'radio-2',
  },
]

const people = [
  { id: 1, name: 'Durward Reynolds', icon: '/assets/images/dollar.png' },
  { id: 2, name: 'Kenton Towne', icon: '/assets/images/tether.png' },
  { id: 3, name: 'Therese Wunsch', icon: '/assets/images/dollar.png' },
  { id: 4, name: 'Benedict Kessler', icon: '/assets/images/tether.png' },
  { id: 5, name: 'Katelyn Rohan', icon: '/assets/images/dollar.png' },
]

interface NumericForm {
  simple: string
}

export interface SelectCoinModalPropsForm {
  chain: string
  'radio-1': string
  'radio-2': string
  checkbox: boolean
}

const FormComponentDemo = () => {
  const { control: controlControlledForm } = useForm<SelectCoinModalPropsForm>({
    defaultValues: { chain: '', 'radio-1': 'c1', 'radio-2': 'h1', checkbox: true },
  })

  const [selected, setSelected] = useState<TType>(people[1])

  const {
    control: numericFormController,
    handleSubmit: numericFormHandleSubmit,
    watch: numericFormWatch,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<NumericForm>({ defaultValues: { simple: '0.00' } })
  const { formatNumber, addDecimalNumbers, subDecimalNumbers } = useHelper()
  const simpleCurrentValue = numericFormWatch('simple')

  return (
    <Container>
      <div className="flex gap-5 p-4 flex-wrap">
        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Text Input and Label</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="1-1" className="flex items-center gap-x-2">
                <span>Name</span>
              </Label>
              <Input placeholder="type here" id="1-1" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="1-2" className="flex items-center gap-x-2">
                <span>Email Address</span>
              </Label>
              <Input placeholder="example@crypto.com" id="1-2" />
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle> Text Input and label with Icon</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="2-1" className="flex items-center gap-x-2">
                <SingleUserIcon />
                <span>Name</span>
              </Label>
              <InputIcon>
                <Input placeholder="type here" id="2-1" />
                <CentIcon className="text-warning" />
              </InputIcon>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="2-2" className="flex items-center gap-x-2">
                <EmailIcon />
                <span>Email Address</span>
              </Label>
              <InputIcon>
                <Input placeholder="example@crypto.com" id="2-2" />
                <CentIcon className="text-warning" />
              </InputIcon>
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Valid and invalid Text Input</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="3-1" className="flex items-center gap-x-2">
                Focus and Auto Focus
              </Label>
              <Input autoFocus placeholder="type here" id="3-1" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="3-2" className="flex items-center gap-x-2">
                Valid Value
              </Label>
              <Input valid placeholder="type here" id="3-2" />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="3-3" className="flex items-center gap-x-2">
                Invalid Value
              </Label>
              <Input invalid placeholder="type here" id="3-3" />
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Text Form - Default - Valid - Invalid </CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="4-1" className="flex items-center gap-x-2">
                Password
              </Label>
              <Input placeholder="*****" type="password" id="4-1" />
              <TextForm>Your password must be 8-20 characters long</TextForm>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="4-2" className="flex items-center gap-x-2">
                Password
              </Label>
              <Input placeholder="*****" type="password" id="4-2" />
              <TextForm variant="valid">Your password must be 8-20 characters long</TextForm>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="4-3" className="flex items-center gap-x-2">
                Password
              </Label>
              <Input placeholder="*****" type="password" id="4-3" />
              <TextForm variant="invalid">Your password must be 8-20 characters long</TextForm>
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Checkbox</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Checkbox</Label>
              <CheckboxGroup>
                <Checkbox id="5-1" />
                <Label htmlFor="5-1" className="flex items-center">
                  <span className="text-white font-normal">
                    I agree to the collection of information in cookies, I agree with
                    <a className="text-link" href="#" target="_blank">
                      Privacy Policy
                    </a>
                    and with
                    <a className="text-link" href="#" target="_blank">
                      Terms of Use
                    </a>
                    , Gambling isnt forbidden by my local authorities and Im at least 18 years old.
                  </span>
                </Label>
              </CheckboxGroup>
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Radio</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Radio Normal</Label>
              <RadioGroup>
                <Radio id="21" name="2" value="21">
                  8
                </Radio>
                <Radio id="22" name="2" value="22">
                  9
                </Radio>
                <Radio id="23" name="2" value="23">
                  10
                </Radio>
                <Radio id="24" name="2" value="24">
                  11
                </Radio>
                <Radio id="25" name="2" value="25">
                  12
                </Radio>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Radio flat</Label>
              <RadioGroup>
                <Radio id="1" name="1" value="1" blockClassName="w-[calc(100/3*1%)]">
                  EASY
                </Radio>
                <Radio id="2" name="1" value="2" blockClassName="w-[calc(100/3*1%)]">
                  MEDIUM
                </Radio>
                <Radio id="3" name="1" value="3" blockClassName="w-[calc(100/3*1%)]">
                  HARD
                </Radio>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Size: Small</Label>
              <RadioGroup>
                <Radio id="71" name="3" value="31" size="sm">
                  <div className="flex items-center gap-2">
                    <Avatar size="md" src="/assets/images/sol.png" alt="sol" />
                    <span>USDC</span>
                  </div>
                </Radio>
                <Radio id="72" name="3" value="31" size="sm">
                  <div className="flex items-center gap-2">
                    <Avatar size="md" src="/assets/images/tether.png" alt="tether" />
                    <span>USDT</span>
                  </div>
                </Radio>
              </RadioGroup>
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Radio Card</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label>Radio Card</Label>

              <RadioCardGroup>
                <RadioCard id="342" name="5" value="7">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Avatar size="md" src="/assets/images/dollar.png" alt="dollar" />
                      <Avatar className="flex-shrink-0 -ml-2" size="md" src="/assets/images/tether.png" alt="tether" />
                    </div>
                    <div className="flex items-center justify-between flex-grow px-2">
                      <span className="font-medium">USDT</span>
                      <span className="text-xs text-white font-normal ml-auto">0.00</span>
                    </div>
                  </div>
                </RadioCard>

                <RadioCard id="41" name="5" value="6">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <Avatar size="md" src="/assets/images/dollar.png" alt="dollar" />
                      <Avatar className="flex-shrink-0 -ml-2" size="md" src="/assets/images/tether.png" alt="tether" />
                    </div>
                    <div className="flex items-center justify-between flex-grow px-2">
                      <span className="font-medium">USDC</span>
                      <span className="text-xs text-white font-normal ml-auto"> 0.00</span>
                    </div>
                  </div>
                </RadioCard>
              </RadioCardGroup>
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Number Input</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="id-233">Numeric Input</Label>
              <Controller
                name="simple"
                control={numericFormController}
                rules={{
                  required: { value: true, message: "It's require" },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                  <NumberInput
                    onChange={onChange}
                    onIncrease={() => numericFormSetValue('simple', addDecimalNumbers(formatNumber(simpleCurrentValue || '0'), 1))}
                    onDecrease={() => numericFormSetValue('simple', subDecimalNumbers(formatNumber(simpleCurrentValue || '0'), 1))}
                    onBlur={onBlur}
                    value={value}
                    id="id-233"
                    placeholder="Placeholder"
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="2-2" className="flex items-center gap-x-2">
                <EmailIcon />
                <span>Numeric Input with Icon </span>
              </Label>

              <Controller
                name="simple"
                control={numericFormController}
                rules={{
                  required: { value: true, message: "It's require" },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState }) => (
                  <InputIcon>
                    <NumberInput
                      onChange={onChange}
                      onIncrease={() => numericFormSetValue('simple', addDecimalNumbers(formatNumber(simpleCurrentValue || '0'), 1))}
                      onDecrease={() => numericFormSetValue('simple', subDecimalNumbers(formatNumber(simpleCurrentValue || '0'), 1))}
                      onBlur={onBlur}
                      value={value}
                      id="id-233"
                      placeholder="Placeholder"
                    />
                    <CentIcon className="text-warning" />
                  </InputIcon>
                )}
              />
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Disabled Forms</CardTitle>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <Label htmlFor="6-1" className="flex items-center gap-x-2">
                Password
              </Label>
              <Input placeholder="*****" type="password" id="4-1" disabled />
              <TextForm>Your password must be 8-20 characters long</TextForm>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="6-2" className="flex items-center gap-x-2">
                <EmailIcon />
                <span>Email Address</span>
              </Label>
              <InputIcon>
                <Input placeholder="example@crypto.com" id="6-2" disabled />
                <CentIcon className="text-warning" />
              </InputIcon>
            </FormGroup>

            <FormGroup>
              <Label>Checkbox</Label>
              <CheckboxGroup>
                <Checkbox id="6-3" disabled />
                <Label htmlFor="6-3" className="flex items-center">
                  <span className="text-white font-normal">
                    I agree to the collection of information in cookies, I agree with
                    <a className="text-link" href="#" target="_blank">
                      Privacy Policy
                    </a>
                    and with
                    <a className="text-link" href="#" target="_blank">
                      Terms of Use
                    </a>
                    , Gambling isnt forbidden by my local authorities and Im at least 18 years old.
                  </span>
                </Label>
              </CheckboxGroup>
            </FormGroup>

            <FormGroup>
              <Label>Radio</Label>
              <RadioGroup>
                <Radio id="61" name="1" value="61" disabled blockClassName="w-[calc(100/3*1%)]">
                  EASY
                </Radio>
                <Radio id="62" name="1" value="62" disabled blockClassName="w-[calc(100/3*1%)]">
                  MEDIUM
                </Radio>
                <Radio id="63" name="1" value="63" disabled blockClassName="w-[calc(100/3*1%)]">
                  HARD
                </Radio>
              </RadioGroup>
            </FormGroup>

            <FormGroup>
              <Label>Radio Card</Label>
              <RadioCard id="64" name="5" value="64" disabled>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Avatar size="md" src="/assets/images/dollar.png" alt="dollar" />
                    <Avatar className="flex-shrink-0 -ml-2" size="md" src="/assets/images/tether.png" alt="tether" />
                  </div>
                  <div className="flex items-center justify-between flex-grow px-2">
                    <span className="font-medium">USDT</span>
                    <span className="text-xs text-white font-normal ml-auto"> 0.00</span>
                  </div>
                </div>
              </RadioCard>
            </FormGroup>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Controlled Component (by state or React form)</CardTitle>
          </CardHeader>
          <CardBody>
            <form>
              <FormGroup>
                <Label>Radio</Label>
                <RadioGroup>
                  {mockRadioData2.map(({ id, label, name, value }) => (
                    <Controller
                      key={id}
                      name="radio-2"
                      control={controlControlledForm}
                      rules={{ required: true }}
                      render={({ field }) => {
                        return (
                          <Radio id={id} name={name} value={value} checked={value === field.value} onChange={field.onChange} blockClassName="w-[calc(100/3*1%)]">
                            {label}
                          </Radio>
                        )
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormGroup>

              <FormGroup>
                <Label>Radio Card</Label>
                <RadioCardGroup>
                  {mockRadioData1.map(({ amount, name, label, id, value, images }) => (
                    <Controller
                      key={id}
                      name="radio-1"
                      control={controlControlledForm}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <RadioCard name={name} id={id} value={value} checked={value === field.value} onChange={field.onChange}>
                          <div className="flex items-center">
                            <div className="flex items-center pl-2">{images?.map(({ alt, src }) => <Avatar key={src} src={src} alt={alt} className="-ml-2" />)}</div>
                            <div className="flex items-center justify-between flex-grow px-2">
                              <span className="font-medium">{label}</span>
                              <span className="text-xs text-white font-normal ml-auto">{amount}</span>
                            </div>
                          </div>
                        </RadioCard>
                      )}
                    />
                  ))}
                </RadioCardGroup>
              </FormGroup>

              <FormGroup>
                <Label>Checkbox</Label>
                <Controller
                  name="checkbox"
                  control={controlControlledForm}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <CheckboxGroup>
                        <Checkbox id="5-5" checked={field.value} onChange={field.onChange} />
                        <Label htmlFor="5-5" className="flex items-center">
                          <span className="text-white font-normal">
                            I agree to the collection of information in cookies, I agree with
                            <a className="text-link" href="#" target="_blank">
                              Privacy Policy
                            </a>
                            and with
                            <a className="text-link" href="#" target="_blank">
                              Terms of Use
                            </a>
                            , Gambling isnt forbidden by my local authorities and Im at least 18 years old.
                          </span>
                        </Label>
                      </CheckboxGroup>
                    )
                  }}
                />
              </FormGroup>
            </form>
          </CardBody>
        </Card>

        <Card size="lg" className="w-[370px] flex-grow">
          <CardHeader>
            <CardTitle>Controlled Component (by state or React form)</CardTitle>
          </CardHeader>
          <CardBody>
            <Select value={selected} onChange={setSelected}>
              <SelectButton className="flex items-center justify-between ">
                <div className="flex items-center text-sm text-main font-medium gap-x-2">
                  {selected.icon && <Avatar src={selected.icon} alt="flag" />}
                  {selected.name}
                </div>
                <ChevronDownIcon className="pointer-events-none size-4 fill-white/60" aria-hidden="true" />
              </SelectButton>
              <SelectList>
                {people.map(({ icon, id, name }) => (
                  <SelectOption value={{ id, name, icon }} key={id} className="flex items-center">
                    {icon && (
                      <SelectIcon>
                        <Avatar className="flex-shrink-0 -ml-2" size="md" src={icon} alt="flag" />
                      </SelectIcon>
                    )}
                    <div className="text-sm text-main font-medium">{name}</div>
                  </SelectOption>
                ))}
              </SelectList>
            </Select>
          </CardBody>
        </Card>
      </div>
    </Container>
  )
}

export default FormComponentDemo
