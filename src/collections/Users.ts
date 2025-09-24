import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'unverified',
      options: [
        { label: 'Unverified User', value: 'unverified' },
        { label: 'Verified User', value: 'verified' },
        { label: 'Vendor', value: 'vendor' },
        { label: 'Admin', value: 'admin' },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.role === 'vendor',
      },
    },
    {
      name: 'approved',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData.role === 'vendor',
      },
    },
  ],
}
