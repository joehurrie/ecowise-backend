import { CollectionConfig } from 'payload/types'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultSort: '-createdAt',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'vendor' || req.user?.role === 'admin',
    update: ({ req, doc }) => {
      if (req.user?.role === 'admin') return true
      if (req.user?.role === 'vendor' && doc?.vendor === req.user.id) return true
      return false
    },
    delete: ({ req, doc }) => {
      if (req.user?.role === 'admin') return true
      if (req.user?.role === 'vendor' && doc?.vendor === req.user.id) return true
      return false
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        if (req.user?.role === 'vendor' && req.user?.approved) {
          data.verified = true
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'KSh',
      required: true,
    },
    {
      name: 'unitsAvailable',
      type: 'number',
      required: true,
      min: 0,
      label: 'Units in Stock',
    },
    {
      name: 'impactTags',
      type: 'select',
      hasMany: true,
      required: true,
      label: 'Impact Types',
      options: [
        { label: 'Low CO₂', value: 'Low CO₂' },
        { label: 'Plastic-Free', value: 'Plastic-Free' },
        { label: 'Locally Produced', value: 'Locally Produced' },
        { label: 'Reusable', value: 'Reusable' },
        { label: 'Biodegradable', value: 'Biodegradable' },
      ],
    },
    {
      name: 'certifications',
      type: 'select',
      hasMany: true,
      required: true,
      options: ['KEBS', 'ISO', 'Fairtrade', 'Organic'],
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['Food', 'Fashion', 'Home', 'Tech'],
    },
    {
      name: 'impactScore',
      type: 'number',
      min: 0,
      max: 10,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'brand',
      type: 'text',
      admin: {
        readOnly: true,
      },
      defaultValue: ({ user }) => user?.company || '',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'paystackCheckoutURL',
      type: 'text',
      label: 'Paystack Checkout Link',
    },
    {
      name: 'verified',
      type: 'checkbox',
      defaultValue: false,
      
    },
    {
      name: 'vendor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => user?.id,
      admin: {
        readOnly: true,
      },
    },
  ],
}
