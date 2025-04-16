import { Button } from '@/components/common/button/button'
import { Card } from '@/components/common/card/card'
import { CardBody } from '@/components/common/card/card-body/card-body'
import { CardHeader } from '@/components/common/card/card-header/card-header'
import { CardTitle } from '@/components/common/card/card-title/card-title'
import { FormGroup } from '@/components/common/form/formGroup/fromGroup'
import { Label } from '@/components/common/form/label/label'
import { TextForm } from '@/components/common/form/textForm/textForm'
import { Input } from '@/components/common/form/textInput/textInput'
import DisabledIcon from '@/components/icons/disabled'
import EmailIcon from '@/components/icons/email'
import SingleUserIcon from '@/components/icons/singleUser'
import { useUpdateUserProfileMutation } from '@/services/user/user.service'
import { useSelector } from '@/store/store'
import Image from 'next/image'
import { Fragment } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UserForm } from '../../../snippets/cards/completeUserData/completeUserData.types'

export const EditProfileData: React.FC<{ onClose: () => void }> = (props) => {
  const { onClose } = props
  const { user } = useSelector((state) => state.auth)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>({ defaultValues: { confirm: false, email: user?.email || '', name: user?.name || '' } })
  const [updateUserProfileMutation, {}] = useUpdateUserProfileMutation() // TODO: in api service section, replace get user call with this endpoint response usage
  const onSubmit: SubmitHandler<UserForm> = (data) => {
    const payload = {
      ...(user?.email?.toLowerCase() !== data?.email.toLowerCase() ? { email: data.email } : {}),
      ...(user?.name !== data?.name ? { name: data.name } : {}),
    }
    if (!Object.keys(payload)?.length) {
      toast.error('No changes has been made to apply!')
      return
    }
    updateUserProfileMutation(payload).then((res) => {
      toast.success('Successfully saved!')
      onClose()
    })
  }

  return (
    <Card size="lg" className="w-full max-w-[431px]">
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
        <button
          onClick={onClose}
          className="appearance-none flex flex-col justify-center items-center p-2.5 focus:bg-primary focus:bg-opacity-60 hover:bg-primary hover:bg-opacity-60 active:bg-opacity-80 transition-all rounded-full "
        >
          <DisabledIcon />
        </button>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col items-center mb-5">
          <Image src={'/assets/images/logo-brand.svg'} alt="Winmore logo-brand" width={48} height={34} className="mb-2" />
          <h2 className="font-bold text-base leading-5 mb-2">Edit your information</h2>
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
                    <Input {...field} invalid={Boolean(fieldState.error)} placeholder="Type your name here..." id="2-1" />
                    {fieldState.error && <TextForm variant="invalid">This field is required!</TextForm>}
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
                    <Input {...field} invalid={Boolean(fieldState.error)} placeholder="example@crypto.com" id="2-2" />
                    {fieldState.error && <TextForm variant="invalid">This field is required!</TextForm>}
                  </Fragment>
                )}
              />
            </FormGroup>

            <Button kind="gradient" size="lg" full type="submit">
              Save
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
