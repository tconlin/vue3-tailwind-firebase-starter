import { ref } from 'vue'
import * as yup from 'yup'

export function useForm() {
  const email = ref('')
  const password = ref('')
  const toggle = ref(false)
  const displayName = ref('')
  const title = ref('')
  const oldPassword = ref('')
  const passwordConfirmation = ref('')
  const document = ref('')
  const website = ref('')
  const helpInfo = ref('')
  const businessName = ref('')
  const weight = ref(0)
  const input = ref('')

  const inputSchema = yup.object({
    input: yup.string().required('Required')
  })

  const titleSchema = yup.object({
    title: yup.string().required('Title is required')
  })

  const businessNameSchema = yup.object({
    businessName: yup.string().required('Business Name is required')
  })

  const loginSchema = yup.object({
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(8)
  })

  const weightSchema = yup.object({
    weight: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required')
  })

  const sizeSchema = yup.object({
    label: yup.string().required('Size name is required'),
    neck: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    chest: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    hip: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    waist: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    overarm: yup.number().positive().typeError('Not a valid number'),
    tail: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    yoke: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    sleeveOpening: yup.number().positive().typeError('Not a valid number'),
    sleeveLeft: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    sleeveRight: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    cuffLeft: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required'),
    cuffRight: yup
      .number()
      .positive()
      .typeError('Not a valid number')
      .required('required')
  })

  const demoSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email(),
    website: yup.string().notRequired(),
    helpInfo: yup.string().notRequired()
  })

  const registerSchema = yup.object({
    displayName: yup.string().required('Name is required'),
    email: yup.string().required('Email is required').email(),
    password: yup.string().required('Password is required').min(8),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })

  const displayNameSchema = yup.object({
    displayName: yup.string().required('Name is required')
  })

  const emailSchema = yup.object({
    email: yup.string().required('Email is required').email()
  })
  const emailWithAuthSchema = yup.object({
    password: yup.string().required('Password is required').min(8),
    email: yup.string().required('Email is required').email()
  })

  const confirmPasswordSchema = yup.object({
    password: yup.string().required('Password is required').min(8),
    oldPassword: yup.string().required('Password is required')
  })

  const customerInfoSchema = yup.object({
    email: yup.string().email(),
    name: yup.string().required('Name is required')
  })

  return {
    email,
    website,
    helpInfo,
    demoSchema,
    password,
    displayName,
    input,
    inputSchema,
    title,
    titleSchema,
    document,
    businessNameSchema,
    businessName,
    customerInfoSchema,
    oldPassword,
    passwordConfirmation,
    toggle,
    weight,
    weightSchema,
    sizeSchema,
    loginSchema,
    registerSchema,
    displayNameSchema,
    emailSchema,
    confirmPasswordSchema
  }
}
