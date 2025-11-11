import { useForm } from 'react-hook-form'
import { useResume } from '../../context/ResumeContext'
import { PersonalInfo } from '../../types'
import { useEffect } from 'react'

export default function PersonalInfoStep() {
  const { state, updateResumeData } = useResume()
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PersonalInfo>({
    defaultValues: state.data.personalInfo
  })

  // Update resume data when form fields change
  useEffect(() => {
    const subscription = watch((value) => {
      updateResumeData({ personalInfo: value as PersonalInfo })
    })
    return () => subscription.unsubscribe()
  }, [watch, updateResumeData])

  const onSubmit = (data: PersonalInfo) => {
    updateResumeData({ personalInfo: data })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Let's start with your basic information. This will appear at the top of your resume.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">First Name *</label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="form-input"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="form-input"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Email *</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="form-input"
              placeholder="john.doe@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Phone *</label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone number is required' })}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="form-label">Address</label>
          <input
            type="text"
            {...register('address')}
            className="form-input"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">City</label>
            <input
              type="text"
              {...register('city')}
              className="form-input"
              placeholder="New York"
            />
          </div>

          <div>
            <label className="form-label">State</label>
            <input
              type="text"
              {...register('state')}
              className="form-input"
              placeholder="NY"
            />
          </div>

          <div>
            <label className="form-label">ZIP Code</label>
            <input
              type="text"
              {...register('zipCode')}
              className="form-input"
              placeholder="10001"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Country</label>
          <input
            type="text"
            {...register('country')}
            className="form-input"
            placeholder="United States"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">LinkedIn</label>
            <input
              type="url"
              {...register('linkedin')}
              className="form-input"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div>
            <label className="form-label">Website</label>
            <input
              type="url"
              {...register('website')}
              className="form-input"
              placeholder="https://johndoe.com"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Professional Summary *</label>
          <textarea
            {...register('summary', { 
              required: 'Professional summary is required',
              minLength: {
                value: 50,
                message: 'Summary should be at least 50 characters'
              }
            })}
            rows={4}
            className="form-input"
            placeholder="Experienced software developer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about creating scalable solutions and leading development teams to deliver high-quality products."
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">{errors.summary.message}</p>
          )}
        </div>
      </form>
    </div>
  )
} 