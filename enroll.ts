import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { Program, Wallet, AnchorProvider } from '@coral-xyz/anchor'
import { IDL, Turbin3Prereq } from './programs/Turbin3_prereq'
import wallet from './dev-turbin3-wallet.json'

const GITHUB_USERNAME = 'rafaelzochling'
const SYSTEM_PROGRAM_ID = new PublicKey(
  'TRBZyQHB3m68FGeVsqTK39Wm4xejadjVhP5MAZaKWDM'
)
const MPL_CORE_PROGRAM_ID = new PublicKey(
  'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'
)
const MINT_COLLECTION_ID = new PublicKey(
  '5ebsp5RChCGK7ssRZMVMufgVZhd2kFbNaotcZ5UvytN2'
)

;(async () => {
  const turbin3WalletPair = Keypair.fromSecretKey(new Uint8Array(wallet))
  const connection = new Connection('https://api.devnet.solana.com')
  const provider = new AnchorProvider(
    connection,
    new Wallet(turbin3WalletPair),
    { commitment: 'confirmed' }
  )
  const program: Program<Turbin3Prereq> = new Program(IDL, provider)
  const accountSeeds = [
    Buffer.from('prereqs'),
    turbin3WalletPair.publicKey.toBuffer(),
  ]
  const [accountKey, accountBump] = PublicKey.findProgramAddressSync(
    accountSeeds,
    program.programId
  )
  const mintTs = Keypair.generate()

  try {
    const initializeTxHash = await program.methods
      .initialize(GITHUB_USERNAME)
      .accountsPartial({
        user: turbin3WalletPair.publicKey,
        account: accountKey,
        system_program: SYSTEM_PROGRAM_ID,
      })
      .signers([turbin3WalletPair])
      .rpc()

    console.log(
      `Initialization Success! Check out your TX here: https://explorer.solana.com/tx/${initializeTxHash}?cluster=devnet`
    )

    const submitTsTxHash = await program.methods
      .submitTs()
      .accountsPartial({
        user: turbin3WalletPair.publicKey,
        account: accountKey,
        mint: mintTs.publicKey,
        collection: MINT_COLLECTION_ID,
        mpl_core_program: MPL_CORE_PROGRAM_ID,
        system_program: SYSTEM_PROGRAM_ID,
      })
      .signers([turbin3WalletPair, mintTs])
      .rpc()

    console.log(
      `SubmitTs Success! Check out your TX here: https://explorer.solana.com/tx/${submitTsTxHash}?cluster=devnet`
    )
  } catch (error: any) {
    console.error(`Oops, something went wrong: ${error}`)
  }
})()
