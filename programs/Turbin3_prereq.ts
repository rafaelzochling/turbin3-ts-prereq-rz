import { Idl } from '@coral-xyz/anchor'

export type Turbin3Prereq = Idl & {
  address: string
  metadata: {
    name: string
    version: string
    spec: string
    description?: string
    repository?: string
    contact?: string
  }
  instructions: Array<{
    name: string
    docs?: string[]
    discriminator: number[]
    accounts: Array<{
      name: string
      docs?: string[]
      writable?: boolean
      signer?: boolean
      optional?: boolean
      address?: string
      pda?: {
        seeds: Array<{
          kind: 'const' | 'arg' | 'account'
          value?: number[]
          path?: string
        }>
        program?: {
          kind: 'const' | 'arg' | 'account'
          value?: number[]
          path?: string
        }
      }
      relations?: string[]
    }>
    args: Array<{
      name: string
      docs?: string[]
      type: string
    }>
    returns?: string
  }>
  accounts?: Array<{
    name: string
    discriminator: number[]
  }>
  events?: Array<{
    name: string
    discriminator: number[]
  }>
  errors?: Array<{
    name: string
    code: number
    msg?: string
  }>
  types?: Array<{
    name: string
    docs?: string[]
    type: {
      kind: 'struct' | 'enum' | 'type'
      fields?: Array<{
        name: string
        docs?: string[]
        type: string
      }>
      variants?: Array<{
        name: string
        fields?: Array<{
          name: string
          type: string
        }>
      }>
      alias?: string
    }
  }>
  constants?: Array<{
    name: string
    type: string
    value: string
  }>
}

export const IDL: Turbin3Prereq = {
  address: 'TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM',
  metadata: {
    name: 'q3_pre_reqs_rs',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'close',
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96],
      accounts: [
        {
          name: 'user',
          writable: true,
        },
        {
          name: 'account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 114, 101, 113, 115],
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'create_collection',
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82],
      accounts: [
        {
          name: 'creator',
          writable: true,
          signer: true,
        },
        {
          name: 'collection',
          writable: true,
          signer: true,
        },
        {
          name: 'authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110],
              },
              {
                kind: 'account',
                path: 'collection',
              },
            ],
          },
        },
        {
          name: 'mpl_core_program',
          address: 'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'initialize',
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 114, 101, 113, 115],
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'github',
          type: 'string',
        },
      ],
    },
    {
      name: 'submit_rs',
      discriminator: [77, 124, 82, 163, 21, 133, 181, 206],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 114, 101, 113, 115],
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'mint',
          writable: true,
          signer: true,
        },
        {
          name: 'collection',
          writable: true,
        },
        {
          name: 'authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110],
              },
              {
                kind: 'account',
                path: 'collection',
              },
            ],
          },
        },
        {
          name: 'mpl_core_program',
          address: 'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'submit_ts',
      discriminator: [137, 241, 199, 223, 125, 33, 85, 217],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'account',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 114, 101, 113, 115],
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'mint',
          writable: true,
          signer: true,
        },
        {
          name: 'collection',
          writable: true,
        },
        {
          name: 'authority',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110],
              },
              {
                kind: 'account',
                path: 'collection',
              },
            ],
          },
        },
        {
          name: 'mpl_core_program',
          address: 'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [],
    },
    {
      name: 'update',
      discriminator: [219, 200, 88, 176, 158, 63, 253, 127],
      accounts: [
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'account',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [112, 114, 101, 113, 115],
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'github',
          type: 'string',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'ApplicationAccount',
      discriminator: [222, 181, 17, 200, 212, 149, 64, 88],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'PreReqTsNotCompleted',
      msg: 'TS submission not completed.',
    },
    {
      code: 6001,
      name: 'PreReqTsAlreadyCompleted',
      msg: 'TS submission already completed.',
    },
    {
      code: 6002,
      name: 'PreReqRsAlreadyCompleted',
      msg: 'Rust submission already completed.',
    },
    {
      code: 6003,
      name: 'PreReqRsNotInTimeWindow',
      msg: 'Submission not allowed.',
    },
  ],
  types: [
    {
      name: 'ApplicationAccount',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'pre_req_ts',
            type: 'bool',
          },
          {
            name: 'pre_req_rs',
            type: 'bool',
          },
          {
            name: 'github',
            type: 'string',
          },
        ],
      },
    },
  ],
}
