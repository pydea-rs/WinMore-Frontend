import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { Checkbox } from '@/components/common/form/checkbox/checkbox'
import { CheckboxGroup } from '@/components/common/form/checkboxGroup/checkboxGroup'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { TextForm } from '@/components/common/form/textForm/textForm'
import { Input } from '@/components/common/form/textInput/textInput'
import DisabledIcon from '@/components/icons/disabled'
import EmailIcon from '@/components/icons/email'
import ReferralCodeIcon from '@/components/icons/referral-code'
import SingleUserIcon from '@/components/icons/singleUser'
import { useRegisterUserMutation } from '@/services/user/user.service'
import Image from 'next/image'
import { Fragment } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CompleteUserDataProps, UserForm } from './completeUserData.types'

export const CompleteUserDataCard: React.FC<CompleteUserDataProps> = (props) => {
  const { onCloseModal } = props

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>({ defaultValues: { confirm: false, email: '', name: '', referrerCode: '' } })
  const [registerMutation, {}] = useRegisterUserMutation()
  const onSubmit: SubmitHandler<UserForm> = ({ email, referrerCode, name }) => {
    registerMutation({ email, name, ...(referrerCode?.length ? { referrerCode } : {}) })
  }

  return (
    <Card size="lg" className="w-full max-w-[431px]">
      <CardHeader>
        <CardTitle>Complete your account</CardTitle>
        <button
          onClick={onCloseModal}
          className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
        >
          <DisabledIcon />
        </button>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col items-center mb-5">
          <Image src={'/assets/images/logo-brand.svg'} alt="Winmore logo-brand" width={48} height={34} className="mb-2" />
          <h2 className="font-bold text-base leading-5 mb-2">WELCOME To WINMORE</h2>
          <span className="text-sm font-light">{"We've saved your seat at the winning table."}</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start">
            <FormGroup>
              <Label htmlFor="2-1" className="flex items-center gap-x-2">
                <SingleUserIcon />
                <span>Name</span>
              </Label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'This field is required!',
                  minLength: { value: 3, message: 'Name is too short!' },
                  maxLength: { value: 256, message: 'Name is too long!' },
                }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input {...field} invalid={Boolean(fieldState.error)} placeholder="Type here" id="2-1" />
                    {fieldState.error && <TextForm variant="invalid">{fieldState.error.message}</TextForm>}
                  </Fragment>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="2-2" className="flex items-center gap-x-2">
                <EmailIcon />
                <span>Email Address</span>
              </Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'This field is required!',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input {...field} invalid={Boolean(fieldState.error)} placeholder="example@winmore.com" id="2-2" />
                    {fieldState.error && <TextForm variant="invalid">{fieldState.error.message}</TextForm>}
                  </Fragment>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="2-2" className="flex items-center gap-x-2">
                <ReferralCodeIcon />
                <span>
                  Referrer Code <sub>(optional)</sub>
                </span>
              </Label>
              <Controller
                name="referrerCode"
                control={control}
                rules={{
                  required: false,
                  minLength: { value: 8, message: 'Referral code can not be shorter than 8 characters!' },
                  maxLength: { value: 10, message: 'Referral Code can not be longer than 10 characters!' },
                }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input {...field} invalid={Boolean(fieldState.error)} placeholder="EXAMPLE8" id="2-2" />
                    {fieldState.error && <TextForm variant="invalid">{fieldState.error.message}</TextForm>}
                  </Fragment>
                )}
              />
            </FormGroup>

            <FormGroup>
              <Controller
                name="confirm"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <CheckboxGroup>
                    <Checkbox {...field} id="6-3" />
                    <Label htmlFor="6-3" className="flex items-center">
                      <span className="inline-block text-white font-normal text-sm leading-5">
                        I agree to the collection of information in cookies, I agree with
                        <a className="text-link" href="#" target="_blank">
                          Privacy Policy
                        </a>
                        and with
                        <a className="text-link" href="#" target="_blank">
                          Terms of Use
                        </a>
                        , Gambling is not forbidden by my local authorities and Im at least 18 years old.
                      </span>
                    </Label>
                    {fieldState.error && <TextForm variant="invalid">You must accept our conditions to continue!</TextForm>}
                  </CheckboxGroup>
                )}
              />
            </FormGroup>

            <Button kind="gradient" size="lg" full type="submit">
              Get Start
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
