import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import wallet from './dev-wallet.json'

;(async () => {
  const keypair = Keypair.fromSecretKey(new Uint8Array(wallet))
  const connection = new Connection('https://api.devnet.solana.com')

  try {
    const txHash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    )
    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${txHash}?cluster=devnet`
    )
  } catch (error: any) {
    console.error(`Oops, something went wrong: ${error}`)
  }
})()
