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
import DisabledIcon from '@/components/icons/disabled/disabled'
import EmailIcon from '@/components/icons/email/email'
import SingleUserIcon from '@/components/icons/singleUser/singleUser'
import Image from 'next/image'
import { Fragment } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CompleteUserDataProps, UserForm } from './completeUserData.types'

export const CompleteUserDataCard: React.FC<CompleteUserDataProps> = (props) => {
  const { isOpenModal, onCloseModal, onComplete } = props

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>({ defaultValues: { confirm: false, email: '', name: '' } })

  const onSubmit: SubmitHandler<UserForm> = (data) => {
    console.log(data)
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
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input {...field} invalid={!!fieldState.error} placeholder="type here" id="2-1" />
                    {fieldState.error && <TextForm variant="invalid">This field is require!</TextForm>}
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
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <Fragment>
                    <Input {...field} invalid={!!fieldState.error} placeholder="example@crypto.com" id="2-2" />
                    {fieldState.error && <TextForm variant="invalid">This field is require!</TextForm>}
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
                        , Gambling isnt forbidden by my local authorities and Im at least 18 years old.
                      </span>
                    </Label>
                    {fieldState.error && <TextForm variant="invalid">This field is require!</TextForm>}
                  </CheckboxGroup>
                )}
              />
            </FormGroup>

            <Button kind="gradient" size="lg" full type="submit">
              Primary
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
