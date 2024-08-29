import { Checkbox } from '@/components/common/form/checkbox/checkbox'
import { FormCheck } from '@/components/common/form/formCheck/formCheck'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { NumberInput } from '@/components/common/form/numberInput/numberInput'
import { Radio } from '@/components/common/form/radio/radio'
import { RadioCard } from '@/components/common/form/radioCard/radioCard'
import { TextForm } from '@/components/common/form/textForm/textForm'
import { TextInput } from '@/components/common/form/textInput/textInput'
import { TextInputIcon } from '@/components/common/form/textInputIcon/textInputIcon'
import CentIcon from '@/components/icons/cent/cent'
import EmailIcon from '@/components/icons/email/email'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import { useHelper } from '@/hooks/usehelper'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'

interface NumericForm {
  simple: string
}

const FormComponentDemo = () => {
  const {
    control: numericFormController,
    handleSubmit: numericFormHandleSubmit,
    watch: numericFormWatch,
    setValue: numericFormSetValue,
    formState: { errors },
  } = useForm<NumericForm>({ defaultValues: { simple: '0' } })
  const { formatNumber, addDecimalNumbers, subDecimalNumbers } = useHelper()
  const simpleCurrentValue = numericFormWatch('simple')

  return (
    <div className="px-4 2xl:container">
      <div className="flex gap-5 p-4 flex-wrap">
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[370px]">
          <h1 className="text-main mb-4"> Text Input and Label </h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label htmlFor="1-1" className="flex items-center gap-x-2">
                <span>Name</span>
              </Label>
              <TextInput placeholder="type here" id="1-1" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="1-2" className="flex items-center gap-x-2">
                <span>Email Address</span>
              </Label>
              <TextInput placeholder="example@crypto.com" id="1-2" />
            </FormGroup>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[370px]">
          <h1 className="text-main mb-4"> Text Input and label with Icon</h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label htmlFor="2-1" className="flex items-center gap-x-2">
                <SingleUserIcon />
                <span>Name</span>
              </Label>
              <TextInputIcon>
                <TextInput placeholder="type here" id="2-1" />
                <CentIcon className="text-warning" />
              </TextInputIcon>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="2-2" className="flex items-center gap-x-2">
                <EmailIcon />
                <span>Email Address</span>
              </Label>
              <TextInputIcon>
                <TextInput placeholder="example@crypto.com" id="2-2" />
                <CentIcon className="text-warning" />
              </TextInputIcon>
            </FormGroup>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[370px]">
          <h1 className="text-main mb-4"> Valid and invalid Text Input </h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label htmlFor="3-1" className="flex items-center gap-x-2">
                Focus and Auto Focus
              </Label>
              <TextInput autoFocus placeholder="type here" id="3-1" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="3-2" className="flex items-center gap-x-2">
                Valid Value
              </Label>
              <TextInput valid placeholder="type here" id="3-2" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="3-3" className="flex items-center gap-x-2">
                Invalid Value
              </Label>
              <TextInput invalid placeholder="type here" id="3-3" />
            </FormGroup>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[370px]">
          <h1 className="text-main mb-4"> Text Form - Default - Valid - Invalid </h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label htmlFor="4-1" className="flex items-center gap-x-2">
                Password
              </Label>
              <TextInput placeholder="*****" type="password" id="4-1" />
              <TextForm>Your password must be 8-20 characters long</TextForm>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="4-2" className="flex items-center gap-x-2">
                Password
              </Label>
              <TextInput placeholder="*****" type="password" id="4-2" />
              <TextForm variant="valid">Your password must be 8-20 characters long</TextForm>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="4-3" className="flex items-center gap-x-2">
                Password
              </Label>
              <TextInput placeholder="*****" type="password" id="4-3" />
              <TextForm variant="invalid">Your password must be 8-20 characters long</TextForm>
            </FormGroup>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[370px]">
          <h1 className="text-main mb-4"> Checkbox</h1>
          <div className="flex flex-col items-start">
            <FormCheck>
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
            </FormCheck>
          </div>
        </div>

        <div className="py-8 px-6 rounded-2xl bg-secondary w-[420px]">
          <h1 className="text-main mb-4">Radio</h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label>Game mode</Label>
              <div className="grid grid-cols-3 gap-x-2">
                <Radio id="1" name="1" value="1">
                  EASY
                </Radio>
                <Radio id="2" name="1" value="2">
                  MEDIUM
                </Radio>
                <Radio id="3" name="1" value="3">
                  HARD
                </Radio>
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Row </Label>
              <div className="grid grid-cols-5 gap-x-2">
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
              </div>
            </FormGroup>
            <FormGroup>
              <Label>Small </Label>
              <div className="flex items-center gap-x-2">
                <Radio id="71" name="3" value="31" size="sm">
                  <div className="flex items-center gap-2">
                    <Image src={'/assets/images/sol.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0" />
                    <span>USDC</span>
                  </div>
                </Radio>
                <Radio id="72" name="3" value="31" size="sm">
                  <div className="flex items-center gap-2">
                    <Image src={'/assets/images/tether.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0" />
                    <span>USDT</span>
                  </div>
                </Radio>
              </div>
            </FormGroup>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[340px]">
          <h1 className="text-main mb-4">Radio Card</h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <RadioCard id="41" name="5" value="6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Image src={'/assets/images/dollar.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0" />
                    <Image src={'/assets/images/tether.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0 -ml-2" />
                  </div>
                  <div className="flex items-center justify-between flex-grow px-2">
                    <span className="font-medium">USDC</span>
                    <span className="text-xs text-white font-normal ml-auto"> 0.00</span>
                  </div>
                </div>
              </RadioCard>
            </FormGroup>
            <FormGroup>
              <RadioCard id="342" name="5" value="7">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Image src={'/assets/images/dollar.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0" />
                    <Image src={'/assets/images/tether.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0 -ml-2" />
                  </div>
                  <div className="flex items-center justify-between flex-grow px-2">
                    <span className="font-medium">USDT</span>
                    <span className="text-xs text-white font-normal ml-auto"> 0.00</span>
                  </div>
                </div>
              </RadioCard>
            </FormGroup>
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[340px]">
          <h1 className="text-main mb-4">Number Input</h1>
          <div className="flex flex-col items-start">
            <Controller
              name="simple"
              control={numericFormController}
              rules={{
                required: { value: true, message: "It's require" },
              }}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormGroup>
                  <Label htmlFor="id-233">Numeric Input</Label>
                  <NumberInput
                    onChange={onChange}
                    onIncrease={() => numericFormSetValue('simple', addDecimalNumbers(formatNumber(simpleCurrentValue), '1'))}
                    onDecrease={() => numericFormSetValue('simple', subDecimalNumbers(formatNumber(simpleCurrentValue), '1'))}
                    onBlur={onBlur}
                    value={value}
                    id="id-233"
                    placeholder="Placeholder"
                  />
                </FormGroup>
              )}
            />
          </div>
        </div>
        <div className="py-8 px-6 rounded-2xl bg-secondary w-[370px]">
          <h1 className="text-main mb-4">Disabled Forms</h1>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label htmlFor="6-1" className="flex items-center gap-x-2">
                Password
              </Label>
              <TextInput placeholder="*****" type="password" id="4-1" disabled />
              <TextForm>Your password must be 8-20 characters long</TextForm>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="6-2" className="flex items-center gap-x-2">
                <EmailIcon />
                <span>Email Address</span>
              </Label>
              <TextInputIcon>
                <TextInput placeholder="example@crypto.com" id="6-2" disabled />
                <CentIcon className="text-warning" />
              </TextInputIcon>
            </FormGroup>
            <FormCheck>
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
            </FormCheck>
            <FormGroup>
              <Label>Game mode</Label>
              <div className="grid grid-cols-3 gap-x-2">
                <Radio id="61" name="1" value="61" disabled>
                  EASY
                </Radio>
                <Radio id="62" name="1" value="62" disabled>
                  MEDIUM
                </Radio>
                <Radio id="63" name="1" value="63" disabled>
                  HARD
                </Radio>
              </div>
            </FormGroup>
            <RadioCard id="64" name="5" value="64" disabled>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Image src={'/assets/images/dollar.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0" />
                  <Image src={'/assets/images/tether.png'} alt="sol" width={'24'} height={'24'} className="rounded-full flex-shrink-0 -ml-2" />
                </div>
                <div className="flex items-center justify-between flex-grow px-2">
                  <span className="font-medium">USDT</span>
                  <span className="text-xs text-white font-normal ml-auto"> 0.00</span>
                </div>
              </div>
            </RadioCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormComponentDemo
